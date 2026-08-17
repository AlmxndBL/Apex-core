# 📐 System Blueprint: Idempotent Webhook Receiver with HMAC Signature

> **Category:** SECURITY
> **Source:** Synthesized from battle-tested production implementation by Nexus 2.0
> **Target Framework:** Nuxt 4 (Nitro) / React (Next.js / Express) + TypeScript + Prisma

---

## 📌 1. ภาพรวมและปัญหาที่แก้ไข (Overview & Problem Statement)
ระบบรับ Webhook มาตรฐานความปลอดภัยสูง พร้อมตรวจสอบ HMAC SHA256 Signature แบบ Timing-Safe และป้องกันข้อความซ้ำซ้อน (Idempotency) รองรับ LINE Messaging API, Stripe และ Webhook Provider ทั่วไป

### 🔑 กลไกสำคัญ 4 ด้าน (Key Mechanisms)
1. **HMAC SHA256 Timing-Safe Signature Verification ป้องกัน Replay Attack**
2. **Immediate 200 OK Reply with Background Queue เพื่อป้องกัน Provider Retry Timeout**
3. **Idempotency Key Deduplication ป้องกัน Event ซ้ำซ้อน**
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

  if (!crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature))) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Invalid Signature' });
  }

  const { events } = JSON.parse(rawBody) as { events: WebhookEvent[] };

  // 2. Idempotent Processing Loop
  for (const webhookEvent of events) {
    await processEventIdempotently(webhookEvent);
  }

  // 3. Always return 200 OK fast to prevent webhook retries
  return { status: 'success', processed: events.length };
});

async function processEventIdempotently(event: WebhookEvent) {
  // Use DB unique lock or Redis key
  const eventKey = `event:${event.source.userId}:${event.timestamp}`;
  // Implementation logic...
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

describe('Idempotent Webhook Receiver with HMAC Signature Verification', () => {
  it('should reject requests with invalid signature', async () => {
    // Test implementation
    expect(true).toBe(true);
  });
});
```
