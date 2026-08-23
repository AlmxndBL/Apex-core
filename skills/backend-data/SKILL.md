---
name: backend-data
description: Strict TypeScript Mastery, PostgreSQL & Prisma ORM Architecture, API Design, Security, and Transaction Optimization
---

# Backend, Data Architecture & Strict TypeScript Skill

> มาตรฐานวิศวกรรมฝั่ง Backend ฐานข้อมูล PostgreSQL, Prisma ORM, REST API และ TypeScript ไร้ `any` 100% สไตล์ Matt Pocock & Pragmatic Engineering

---

## 1. Strict TypeScript Standards (No Any Policy)

* **Eliminate `any`:** ใช้ `unknown` ร่วมกับ Type Narrowing (Zod, `typeof`, `instanceof`) เสมอ
* **Discriminated Unions:** ใช้ระบุสถานะข้อมูลที่ชัดเจน (เช่น `{ status: 'success'; data: T } | { status: 'error'; message: string }`)
* **Zod Schema Inference:** สร้าง Type จาก Schema เสมอด้วย `z.infer<typeof MySchema>` เพื่อไม่ให้ Type กับ Validation หลุดออกจากกัน

---

## 2. Database & Prisma ORM Optimization

* **Prevent N+1 Queries:** ดึงความสัมพันธ์ด้วย `select` หรือ `include` ที่ระบุ Field เฉพาะเจาะจง ห้ามดึงข้อมูลเกินจำเป็น
* **Index Strategy:** วาง `@@index` บน Foreign Keys และ Column ที่ใช้ใน `WHERE`, `ORDER BY`, และ `JOIN` บ่อยๆ
* **Safe Transactions:** ใช้ `prisma.$transaction([ ... ])` สำหรับกระบวนการที่ต้องทำหลายตารางพร้อมกัน (เช่น ตัดสต๊อก + สร้างบิล)
* **Soft Deletes:** ใช้ Field `deletedAt DateTime?` และใส่ Filter `where: { deletedAt: null }` เสมอ

---

## 3. API Security & Validation

* **Strict Input Parsing:** ทุก Endpoint / Server Action ต้องผ่าน Zod Validation ก่อนเข้า Business Logic
* **No Secrets in Code:** ใช้ `<secret:VAR_NAME>` หรือ `.env` เสมอ ห้ามฮาร์ดโค้ด Key/Password เด็ดขาด
* **Safe Error Responses:** ห้ามส่ง Raw Database Error หรือ Stack Trace ออกไปให้ Client -> แปลงเป็น Friendly Error Message เสมอ
