---
name: typescript-wizard
description: Strict TypeScript Mastery & Type Gymnastics Skill (Total TypeScript style, Discriminated Unions, Generics, Zod Schema Inference, eliminating any, and Type Narrowing)
---

# 🧙‍♂️ Strict TypeScript Mastery Skill (The Matt Pocock Way)

> สกิลระดับสูงสำหรับการเขียน TypeScript ขั้นสูง ปลอดภัยระดับ Type-Safe 100% ไร้ `any` และมี Developer Experience ยอดเยี่ยม

---

## 🎯 เมื่อไหร่ที่ควรใช้ Skill นี้
- เมื่อต้องประกาศ Type สำหรับ API Request/Response, Database Layer หรือ Complex State
- เมื่อต้องการสร้าง Reusable Generics และ Helper Utility Types
- เมื่อต้องการแปลง Runtime Validation (Zod) ให้เป็น TypeScript Types อัตโนมัติ

---

## 🛡️ 1. Absolute Zero `any` Policy & `unknown` Usage

ห้ามใช้ `any` เด็ดขาด หากไม่ทราบชนิดข้อมูลล่วงหน้า ให้ใช้ `unknown` แล้วทำ Type Narrowing:

```typescript
// ❌ BAD: สูญเสีย Type safety ทั้งหมด
function parseResponse(data: any) {
  return data.user.id
}

// ✅ GOOD: ปลอดภัยด้วย unknown + Type Guard
function parseResponse(data: unknown): string {
  if (
    typeof data === 'object' &&
    data !== null &&
    'user' in data &&
    typeof (data as Record<string, unknown>).user === 'object'
  ) {
    const user = (data as { user: { id: string } }).user
    return user.id
  }
  throw new Error('Invalid response structure')
}
```

---

## 🎭 2. Discriminated Unions (การจำลอง State ที่ไม่มีวันผิดพลาด)

ใช้ Discriminated Unions เพื่อจัดการ Async State หรือ Result Types:

```typescript
// ✅ Modeling UI Async States
export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error }

// ✅ Pattern Matching / Type Narrowing
function render(state: AsyncState<User>) {
  switch (state.status) {
    case 'loading':
      return 'Loading...'
    case 'success':
      return `Welcome, ${state.data.name}` // TypeScript รู้ทันทีว่า data ไม่ใช่ null!
    case 'error':
      return `Failed: ${state.error.message}`
    default:
      return null
  }
}
```

---

## 📐 3. Zod Schema & Automatic Type Inference

ประกาศ Schema การตรวจสอบข้อมูลเพียงครั้งเดียว แล้วดึง Type ออกมาใช้งาน (Single Source of Truth):

```typescript
import { z } from 'zod'

// 1. กำหนด Runtime Validation Schema
export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['ADMIN', 'STAFF', 'CUSTOMER']).default('CUSTOMER'),
  age: z.number().int().positive().optional()
})

// 2. Infer ออกมาเป็น TypeScript Type โดยไม่ต้องพิมพ์ซ้ำ
export type CreateUserInput = z.infer<typeof CreateUserSchema>

// 3. ใช้ใน Handler / Function
export async function createUser(input: CreateUserInput) {
  // input จะมี Type ตรงตาม Schema 100%
}
```

---

## ⚡ 4. Exhaustive Checking with `never`

ป้องกันการลืมเคสใหม่เมื่อมีการเพิ่ม Enum หรือ Union Type ในอนาคต:

```typescript
type Action = 'CREATE' | 'UPDATE' | 'DELETE' | 'ARCHIVE'

function handleAction(action: Action) {
  switch (action) {
    case 'CREATE': return doCreate()
    case 'UPDATE': return doUpdate()
    case 'DELETE': return doDelete()
    case 'ARCHIVE': return doArchive()
    default: {
      // หากมี Action ใหม่เพิ่มเข้ามาแล้วลืมใส่ case, TypeScript จะฟ้อง Error ตรงนี้ทันที!
      const _unreachable: never = action
      throw new Error(`Unhandled action: ${_unreachable}`)
    }
  }
}
```
