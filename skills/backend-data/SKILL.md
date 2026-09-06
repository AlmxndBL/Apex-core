---
name: backend-data
description: Strict TypeScript Mastery, PostgreSQL & Prisma ORM Architecture, API Design, Security, and Transaction Optimization
---

# Backend, Data Architecture & Strict TypeScript Skill (v5.5.0)

> Production engineering standards for backend systems, PostgreSQL, Prisma ORM, RESTful APIs, and strict TypeScript without `any`.

---

## 1. Standard API Handler Blueprint (Nuxt 4 / Nitro & Next.js)

Never write messy monolithic endpoint handlers. Follow the 4-step pipeline: **Validate $\to$ Authorize $\to$ Service Execution $\to$ Structured Response**.

### Nuxt 4 (Nitro Endpoint Pattern: `server/api/v1/rooms/index.post.ts`)
```typescript
import { z } from 'zod';
import { CreateRoomSchema, type RoomResponse } from '~/shared/contracts/room.contract';
import { createRoomService } from '~/server/services/room.service';

export default defineEventHandler(async (event): Promise<ApiResponse<RoomResponse>> => {
  // 1. Session & Role Guard
  const session = await requireAuthSession(event);
  requireRole(session, ['ADMIN', 'MANAGER']);

  // 2. Schema Validation (Fail Fast)
  const body = await readValidatedBody(event, CreateRoomSchema.parse);

  // 3. Service Layer Execution (Pass tenant & validated payload)
  const newRoom = await createRoomService({
    tenantId: session.user.tenantId,
    data: body,
  });

  // 4. Standard Response Wrapper
  return {
    success: true,
    data: newRoom,
    error: null,
  };
});
```

---

## 2. Service Layer & Database Transaction Pattern

Keep API routes thin. Move database transactions, business calculations, and multi-table operations into dedicated services (`server/services/`):

```typescript
// server/services/order.service.ts
import { prisma } from '~/server/utils/prisma';
import type { CreateOrderDTO } from '~/shared/contracts/order.contract';

export async function processOrderTransaction(tenantId: string, payload: CreateOrderDTO) {
  return await prisma.$transaction(async (tx) => {
    // 1. Check stock & decrement atomically
    const item = await tx.inventoryItem.update({
      where: { id: payload.itemId, tenantId },
      data: { stock: { decrement: payload.quantity } },
    });

    if (item.stock < 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'INSUFFICIENT_STOCK',
        message: `Not enough stock available for item ${item.name}`,
      });
    }

    // 2. Create Order Record
    const order = await tx.order.create({
      data: {
        tenantId,
        itemId: payload.itemId,
        quantity: payload.quantity,
        totalPrice: payload.quantity * item.price,
        status: 'PENDING',
      },
    });

    return order;
  }, {
    timeout: 5000, // 5s timeout guard
  });
}
```

---

## 3. End-to-End Type Contract Pattern (SDD)

Declare schemas once in a shared contract directory (`shared/contracts/`) to eliminate drift between frontend and backend:

```typescript
// shared/contracts/room.contract.ts
import { z } from 'zod';

export const CreateRoomSchema = z.object({
  number: z.string().min(1, 'Room number is required').max(20),
  floor: z.number().int().min(1),
  price: z.number().positive('Price must be greater than 0'),
  type: z.enum(['STANDARD', 'DELUXE', 'SUITE']),
});

export type CreateRoomInput = z.infer<typeof CreateRoomSchema>;

export interface RoomResponse {
  id: string;
  number: string;
  floor: number;
  price: number;
  type: 'STANDARD' | 'DELUXE' | 'SUITE';
  createdAt: string;
}
```

---

## 4. Database & Prisma ORM Optimization Rules

- **Query Performance & Concurrency (canonical text):** Follow `rules/04-database-design.md` §3 — prevent N+1 with explicit `select`/bounded `include`, wrap multi-table mutations in `prisma.$transaction()` with a 5-second timeout, and use atomic increments plus the OCC `version`-column conditional-update pattern for contested balances/stock (do not re-implement it differently here).
- **Index Strategy:** Place `@@index` on frequently filtered, joined, or ordered columns (e.g. foreign keys, `tenantId`, `status`, `createdAt`) — not blanket-indexing.
- **Soft Deletes:** Standardize on `deletedAt DateTime?` and filter queries with `where: { deletedAt: null }`. Ensure unique constraints account for soft-deleted rows.

---

## 5. Security & Better Auth Integration

- **Supported Auth Default:** When the project needs authentication, **Better Auth (`better-auth`)** with `@better-auth/prisma-adapter` is a supported default — not a mandatory dependency for every project (see `rules/01-security-auth.md`).
- **RBAC Enforcement:** Never trust client-sent role claims. Validate session permissions on every backend mutation.
- **Sanitized Client Errors:** Catch errors in middleware/services and return clean JSON envelopes. Never expose raw SQL errors, stack traces, or schema definitions to the client.
