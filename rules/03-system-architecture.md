# 03. System Architecture & API Standards

> **Priority 3:** สถาปัตยกรรมระบบและมาตรฐานการออกแบบ API สไตล์ Pragmatic Engineer (The 9arm Way)

---

## 🧠 1. Core Architecture Philosophy
1. **Don't Over-engineer:** เลือกสิ่งที่แก้ปัญหาได้ตรงจุดที่สุด อย่าใช้เทคโนโลยีที่ใหญ่เกินความจำเป็นของโปรเจกต์
2. **Trade-off Analysis:** ทุกการเลือกมีข้อดีข้อเสีย ต้องสามารถอธิบายเหตุผลเปรียบเทียบได้เสมอ
3. **Monolith First:** เริ่มต้นด้วย **Modular Monolith** เป็นค่าเริ่มต้น อย่าเพิ่งแยก Microservices หากไม่มีเหตุผลด้านสเกลและทีมที่ชัดเจน
4. **Operations Mindset:** คิดถึงตอน Deploy, Backup, และ Maintain ด้วยเสมอ ไม่ใช่แค่ตอนเขียนโค้ด

---

## 📊 2. Architecture Diagram Rules
- **ห้ามสร้าง Diagram (เช่น Mermaid) ออกมาเองโดยพลการ**
- **ต้องถามผู้ใช้ก่อนเสมอ:** *"ต้องการให้ผมวาด Architecture Diagram เพื่อดูภาพรวมก่อนเริ่มเขียนโค้ดไหมครับ?"*
- เมื่อผู้ใช้ยืนยัน จึงค่อยสร้าง Diagram ที่กระชับและเข้าใจง่าย

---

## ⚙️ 3. Primary Stack Architecture Presets

### 🟢 Preset A: Nuxt 4 (Nitro + Vue 3)
- **Engine:** Nitro Backend Engine + Vue 3 Frontend
- **Structure:**
  - `server/api/v1/`: Server REST API Endpoints
  - `server/middleware/`: Auth, CORS, Logging, Rate Limit Middleware
  - `server/utils/`: Prisma client instance, Server utilities & Validators
  - `app/layouts/`: App Shell Layouts (`default.vue`, `admin.vue`)
  - `app/pages/`: File-based Routing Views
  - `app/features/`: Feature Domain Modules & Logic
  - `app/components/ui/`: Atomic / Shared Dumb UI Components (Nuxt UI)
  - `app/composables/`: Client state & shared composables

### 🔵 Preset B: React (Next.js App Router / Vite SPA)
- **Next.js:** ใช้ App Router + Server Components เป็น Default
  - `app/api/v1/`: Route Handlers (`route.ts`)
  - `src/layouts/`: App Shell Layouts (`RootLayout.tsx`, `AdminLayout.tsx`)
  - `src/features/`: Feature Domain Modules (components, hooks, types)
  - `src/components/ui/`: Shared Atomic Components (Shadcn UI / Radix)
  - `src/store/`: Global Client State (Zustand)
- **Vite SPA:** แยก `src/layouts/`, `src/pages/`, `src/features/`, `src/components/ui/`, `src/routes/`

---

## 🔌 4. RESTful API Standards
- **Naming Conventions:** ใช้ Noun และ Plural สำหรับ Resources เช่น `/api/v1/users`, `/api/v1/orders`
- **Standardized JSON Response:**
  ```json
  {
    "success": true,
    "data": { ... },
    "error": null,
    "meta": { "pagination": { "page": 1, "limit": 20, "total": 100 } }
  }
  ```
- **Standard Error Response:**
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "ข้อมูลไม่ถูกต้อง",
      "details": [{ "field": "email", "message": "รูปแบบอีเมลไม่ถูกต้อง" }]
    }
  }
  ```
- **HTTP Status Codes:**
  - `200 OK`, `201 Created`
  - `400 Bad Request` (Validation Failed), `401 Unauthorized`, `403 Forbidden`, `404 Not Found`
  - `429 Too Many Requests`, `500 Internal Server Error`

---

## 🛡️ 5. Request Validation (Zod)
- ทุก Endpoint ต้อง Validate Request ก่อนประมวลผล (Body, Query Params, Path Params)
- **Nuxt / Nitro:** ใช้ `readValidatedBody()` และ `getValidatedQuery()`
- **Next.js / Express:** ใช้ Zod Schema `.parse()` หรือ `.safeParse()` ใน Route Handlers
- คืนค่า `400 Bad Request` พร้อม `details` เมื่อ Validation ไม่ผ่าน

---

## 🔁 6. Idempotency & Reliability
- **Idempotency Key:** การทำธุรกรรมหรือคำสั่งสร้างข้อมูลที่สำคัญ (เช่น Order, Payment) ต้องรองรับ Header `Idempotency-Key: <UUID>`
- Server เก็บ Key + Response ไว้ 24 ชั่วโมง หากมี Key ซ้ำให้คืน Response เดิมโดยไม่ประมวลผลซ้ำ
- **Timeout:** กำหนด Timeout สูงสุดที่ **30 วินาที** สำหรับทุก API Request
- **Client Retry:** ใช้ Exponential Backoff (1s $\rightarrow$ 2s $\rightarrow$ 4s) สูงสุด 3 ครั้ง เฉพาะ Idempotent Request หรือเมื่อเกิด 5xx/Network Error (ห้าม Retry เมื่อเกิด 4xx)

---

## 📑 7. Pagination Guidance
- **Cursor-based Pagination (`after` / `before`):** เหมาะสำหรับ User-facing feeds, Real-time lists, Infinite Scroll (ป้องกันข้อมูลตกหล่นเมื่อมีข้อมูลใหม่แทรก)
- **Offset-based Pagination (`page` / `limit`):** เหมาะสำหรับ Admin Panel, Data Tables และรายงานผล
