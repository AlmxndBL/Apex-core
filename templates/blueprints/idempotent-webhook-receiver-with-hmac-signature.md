# 📐 System Blueprint: Idempotent Webhook Receiver with HMAC Signature

> **Category:** SECURITY
> **Source:** Synthesized from battle-tested production implementation by Nexus 2.0
> **Target Framework:** Nuxt 4 (Nitro) / React (Next.js / Express) + TypeScript + Prisma

---

## 📌 1. ภาพรวมและปัญหาที่แก้ไข (Overview & Problem Statement)
ระบบรับ Webhook มาตรฐานความปลอดภัยสูง พร้อมตรวจสอบ HMAC SHA256 Signature แบบ Timing-Safe และป้องกันข้อความซ้ำซ้อน (Idempotency) รองรับ LINE Messaging API, Stripe และ Webhook Provider ทั่วไป

### 🔑 กลไกสำคัญ 4 ด้าน (Key Mechanisms)
1. **HMAC SHA256 Timing-Safe Signature Verification ยืนยันต้นทาง (Authenticity)** — การกัน Replay Attack ต้องอาศัย timestamp freshness check และ Idempotency dedup ร่วมด้วย (HMAC เพียงอย่างเดียวไม่ป้องกัน replay)
2. **Fast 200 OK Reply เพื่อป้องกัน Provider Retry Timeout** — ตัวอย่างนี้ process แบบ synchronous ภายใน request; หาก handler ต้องใช้เวลานาน ให้ย้ายงานไป background queue ก่อนตอบ 200
3. **Idempotency Key Deduplication ป้องกัน Event ซ้ำซ้อน** — dedup ด้วย provider event ID + `@unique` constraint ตาม `rules/04-database-design.md` §3
4. **Zero Raw Error Leaks — ดักจับ Exception ทั้งหมดลง Server Log**

---

## 🏗️ 2. สถาปัตยกรรมและโครงสร้างไฟล์ (Architecture & File Layout)

```text
server/
├── api/
│   └── webhooks/
│       └── [provider].post.ts   # Webhook Signature Verification & Idempotency Dispatcher
└── utils/
    ├── signature.ts             # Crypto HMAC/SHA256 Validator
    └── idempotency.ts           # Distributed/DB Locking Mechanism
```

---

## 💻 3. Implementation Blueprint (Generic Code Template)

```typescript
import crypto from 'node:crypto';

interface WebhookEvent {
  id: string;
  type: string;
  source: { userId: string };
  replyToken?: string;
  postback?: { data: string };
  timestamp: number;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const rawBody = await readRawBody(event);
  const signature = getHeader(event, 'x-line-signature');

  if (!rawBody || !signature) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request: Missing Signature or Body' });
  }

  // 1. Verify Signature (Timing-safe)
  const hash = crypto
    .createHmac('sha256', config.LINE_CHANNEL_SECRET)
    .update(rawBody)
    .digest('base64');

  const computedBuf = Buffer.from(hash, 'utf8');
  const signatureBuf = Buffer.from(signature, 'utf8');

  if (computedBuf.length !== signatureBuf.length || !crypto.timingSafeEqual(computedBuf, signatureBuf)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Invalid Signature' });
  }

  let events: WebhookEvent[];
  try {
    ({ events } = JSON.parse(rawBody) as { events: WebhookEvent[] });
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request: Malformed JSON' });
  }

  // 2. Idempotent Processing Loop (errors logged server-side, never leaked raw)
  try {
    for (const webhookEvent of events) {
      await processEventIdempotently(webhookEvent);
    }
  } catch (error) {
    console.error('[webhook] processing failed:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }

  // 3. Always return 200 OK fast to prevent webhook retries
  return { status: 'success', processed: events.length };
});

async function processEventIdempotently(event: WebhookEvent) {
  // Deduplicate on the provider's unique event ID, enforced by a DB @unique index
  // (see rules/04-database-design.md §3 Webhook & Payment Slip Replay Prevention)
  // or a distributed lock (Redis SETNX). Never key on userId + timestamp —
  // distinct events can share the same timestamp and get dropped.
  const eventKey = `event:${event.id}`;
  // Implementation: INSERT ... ON CONFLICT (eventKey) DO NOTHING before processing.
}
```

---

## 🛡️ 4. Security & Hard Gates Checklist
- [x] **Zero Trust:** Signature ตรวจสอบผ่าน Crypto Subtle / HMAC ก่อนอ่าน Body
- [x] **Idempotency:** มี Key Locking ป้องกัน Event ซ้ำซ้อน
- [x] **Safe Error Logging:** ไม่ส่ง Raw Exception ออกสู่ภายนอก
- [x] **Timing Safe:** ใช้ `crypto.timingSafeEqual` เทียบ Hash

---

## 🧪 5. Verification & Test Fixture Standard
```typescript
import { describe, it, expect } from 'vitest';
import crypto from 'node:crypto';

// Adapt the URL/env to the target project. The handler must reject a bad
// signature with 401 before reading/processing the body.
describe('Idempotent Webhook Receiver with HMAC Signature Verification', () => {
  const rawBody = JSON.stringify({ events: [] });

  it('should reject requests with an invalid signature (401)', async () => {
    const badSignature = crypto
      .createHmac('sha256', 'wrong-secret')
      .update(rawBody)
      .digest('base64');

    const res = await fetch('/api/webhooks/line', {
      method: 'POST',
      headers: { 'x-line-signature': badSignature, 'Content-Type': 'application/json' },
      body: rawBody,
    });

    expect(res.status).toBe(401);
  });

  it('should accept and process a valid signed request (200)', async () => {
    const secret = process.env.LINE_CHANNEL_SECRET ?? 'test-channel-secret';
    const signature = crypto.createHmac('sha256', secret).update(rawBody).digest('base64');

    const res = await fetch('/api/webhooks/line', {
      method: 'POST',
      headers: { 'x-line-signature': signature, 'Content-Type': 'application/json' },
      body: rawBody,
    });

    expect(res.status).toBe(200);
  });
});
```
