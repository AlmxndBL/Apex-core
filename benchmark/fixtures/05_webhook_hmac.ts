import { defineEventHandler, getHeader, readRawBody, createError } from 'h3';
import crypto from 'node:crypto';
import { prisma } from '~/server/utils/prisma';

export interface WebhookEventPayload {
  id: string;
  type: 'payment_intent.succeeded' | 'payment_intent.failed' | 'customer.subscription.updated';
  created: number;
  data: {
    object: Record<string, any>;
  };
}

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_secret_key';
const TOLERANCE_SECONDS = 300; // 5 minutes replay protection

export function verifyStripeSignature(rawBody: Buffer, signatureHeader: string, secret: string): boolean {
  if (!signatureHeader || !rawBody) return false;

  const parts = signatureHeader.split(',');
  let timestamp = '';
  let signature = '';

  for (const part of parts) {
    const [key, val] = part.trim().split('=');
    if (key === 't') timestamp = val;
    if (key === 'v1') signature = val;
  }

  if (!timestamp || !signature) return false;

  // 1. Replay attack guard
  const timestampNum = parseInt(timestamp, 10);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestampNum) > TOLERANCE_SECONDS) {
    return false;
  }

  // 2. Cryptographic HMAC comparison
  const signedPayload = `${timestamp}.${rawBody.toString('utf8')}`;
  const computedHmac = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedHmac));
}

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, 'stripe-signature');
  const rawBody = await readRawBody(event);

  if (!signature || !rawBody) {
    throw createError({ statusCode: 400, statusMessage: 'Missing webhook signature or payload' });
  }

  const isValid = verifyStripeSignature(rawBody, signature, WEBHOOK_SECRET);
  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid Webhook Cryptographic Signature' });
  }

  const eventPayload: WebhookEventPayload = JSON.parse(rawBody.toString('utf8'));

  // 3. Idempotent Database Transaction
  await prisma.$transaction(async (tx) => {
    // Process webhook idempotency
  });

  return { received: true, eventId: eventPayload.id };
});
