import { defineEventHandler, getRouterParam, readBody, createError } from 'h3';
import { z } from 'zod';
import { db } from '~/server/utils/db';

const UpdateStatusSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'CANCELLED']),
  note: z.string().max(280).optional(),
});

export default defineEventHandler(async (event) => {
  const orderId = getRouterParam(event, 'id');
  if (!orderId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing order id' });
  }

  const parsed = UpdateStatusSchema.safeParse(await readBody(event));
  if (!parsed.success) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid payload', data: parsed.error.flatten() });
  }

  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order || order.deletedAt) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' });
  }
  if (order.status === 'SHIPPED') {
    throw createError({ statusCode: 409, statusMessage: 'Shipped orders are immutable' });
  }

  const updated = await db.order.update({
    where: { id: orderId },
    data: { status: parsed.data.status, version: { increment: 1 } },
  });

  return { data: { id: updated.id, status: updated.status }, meta: { requestId: event.node.req.id } };
});
