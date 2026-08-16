---
name: database-architect
description: PostgreSQL & Prisma/Drizzle Database Architecture, Performance Tuning, Indexing, and Transaction Optimization Skill
---

# 🗄️ Database Architecture & Query Optimization Skill

> สกิลสำหรับการออกแบบฐานข้อมูลเชิงสัมพันธ์ (PostgreSQL), การจูน Performance ของ Prisma/Drizzle ORM, และการจัดการ Transactions อย่างปลอดภัย

---

## 🎯 เมื่อไหร่ที่ควรใช้ Skill นี้
- เมื่อเริ่มออกแบบ Schema หรือสร้าง Table/Model ใหม่ใน `prisma/schema.prisma`
- เมื่อต้องการแก้ปัญหา Query ช้า (Slow Query) หรือปัญหา N+1 Problem
- เมื่อต้องเขียนโค้ดที่แตะต้องเงิน, สต๊อกสินค้า หรือข้อมูลสำคัญที่ห้ามเกิด Race Condition

---

## ⚡ 1. การแก้ปัญหา N+1 Query (Prisma Optimization)

หลีกเลี่ยงการ query ใน `for` loop ให้ใช้ `include` หรือ `Promise.all` + `in` operator แทน:

```typescript
// ❌ BAD: เกิด N+1 Queries (ยิ่งมีออเดอร์เยอะ ยิ่งยิง DB ถี่)
const orders = await prisma.order.findMany()
for (const order of orders) {
  order.items = await prisma.orderItem.findMany({ where: { orderId: order.id } })
}

// ✅ GOOD: ยิง Query รวมครั้งเดียวด้วย include
const ordersWithItems = await prisma.order.findMany({
  include: {
    items: true,
    user: {
      select: { id: true, name: true, email: true } // เลือกเฉพาะฟิลด์ที่ใช้
    }
  }
})
```

---

## 🏎️ 2. Indexing Strategy (สร้าง Index ให้ถูกจุด)

ใส่ `@@index` บนฟิลด์ที่ใช้ค้นหาบ่อยๆ ในคำสั่ง `WHERE`, `ORDER BY`, และ `JOIN`:

```prisma
model Order {
  id          String      @id @default(cuid())
  userId      String      @map("user_id")
  status      OrderStatus @default(PENDING)
  totalAmount Decimal     @map("total_amount") @db.Decimal(10, 2)
  createdAt   DateTime    @default(now()) @map("created_at")
  deletedAt   DateTime?   @map("deleted_at")

  user        User        @relation(fields: [userId], references: [id])

  // Composite Index สำหรับหน้า Dashboard ที่ค้นหาตาม User + Status + Date
  @@index([userId, status, createdAt])
  @@index([deletedAt])
  @@map("orders")
}
```

---

## 🔒 3. Safe Interactive Transactions (ป้องกันเงินเบิ้ล & Deadlock)

เมื่อมีการหักเงินหรือตัดสต๊อก ต้องครอบด้วย `$transaction` เสมอ และหลีกเลี่ยง Long-running async task ใน Transaction:

```typescript
export async function transferFunds(fromUserId: string, toUserId: string, amount: number) {
  return await prisma.$transaction(async (tx) => {
    // 1. ตรวจสอบยอดเงินต้นทาง
    const sender = await tx.user.findUniqueOrThrow({ where: { id: fromUserId } })
    if (sender.balance < amount) {
      throw new Error('Insufficient balance')
    }

    // 2. หักเงินต้นทาง
    await tx.user.update({
      where: { id: fromUserId },
      data: { balance: { decrement: amount } }
    })

    // 3. เพิ่มเงินปลายทาง
    await tx.user.update({
      where: { id: toUserId },
      data: { balance: { increment: amount } }
    })

    // 4. บันทึกประวัติ Transaction
    return await tx.transferLog.create({
      data: { fromUserId, toUserId, amount }
    })
  }, {
    maxWait: 5000, // รอนานสุด 5 วินาที
    timeout: 10000  // ตัดจบหากเกิน 10 วินาที ป้องกัน Deadlock
  })
}
```
