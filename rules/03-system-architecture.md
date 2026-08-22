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
- ทุก Endpoint และ Server Action ต้อง Validate Request ก่อนประมวลผล (Body, Query Params, Path Params, Form Data)
- **Nuxt 4 / Nitro:** ใช้ `readValidatedBody(event, schema.parse)` และ `getValidatedQuery(event, schema.parse)`
- **Next.js 15 Route Handlers:** อ่าน `await req.json()` แล้วตรวจสอบผ่าน `schema.safeParse(body)` พร้อมคืน `NextResponse.json({ success: false, error: ... }, { status: 400 })`
- **Next.js 15 Server Actions:** Validate arguments ด้วย `schema.safeParse(input)` ที่ต้นฟังก์ชัน Server Action เสมอ ก่อนแตะ Database
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

---

## 🧭 8. Domain-Driven Routing Integrity & Anti-God Page (กฎเหล็ก)

- ❌ **Anti-God Page Pattern:** ห้ามนำ Data Listings, Forms, หรือ Business Logic ของหลาย Domain มากองรวมกันในหน้า Dashboard หน้าเดียว (เช่น นำ Rooms, Room Types, Contracts, Meter Readings, Bills, Payment Slips มารวมใน `/admin/index.vue`)
- 💥 **Impact:**
  1. **API Waterfall & Performance Drag:** หน้าแรกต้องยิง API พร้อมกัน 5-7 เส้น ทำให้หน้าเว็บค้างหรือโหลดช้า
  2. **State Pollution & Race Conditions:** State ของแต่ละฟีเจอร์ปนเปื้อนกัน ดีบักยาก
  3. **RBAC & Deep Linking Failure:** ไม่สามารถกำหนดสิทธิ์เข้าถึงรายเมนู (Granular RBAC) และผู้ใช้ไม่สามารถ Copy URL หน้าที่ต้องการแชร์ได้
- ✅ **Domain-Driven Granular Routing:**
  - **Overview / Dashboard Entry (`/admin`):** แสดงเฉพาะ Executive Summary, KPI Stat Cards, Shortcut Action, และ Real-time Alert Banner
  - **Dedicated Domain Routes:** แยกเป็น Route อิสระ เช่น `/admin/rooms`, `/admin/contracts`, `/admin/payments`, `/admin/billing/batch`, `/admin/reports`
  - **Isolated State & Lazy Data Fetching:** แต่ละ Route ยิง API เฉพาะ Domain ตัวเอง ทำให้ระบบตอบสนองเร็วและสเกลได้อย่างยั่งยืน

---

## 🎯 9. Safe Refactoring, Blast Radius & Smallest Safe Correction

- **Blast Radius Analysis (ประเมินรัศมีผลกระทบ):**
  - ก่อนทำการแก้ไข Shared Types, เปลี่ยน Contract ของ API, แก้ Database Schema, หรือย้ายฟังก์ชัน Utility ส่วนกลาง
  - Agent จะต้องสแกนหา **Consumers / Caller List (`grep_search` หรือ Graph callers)** เพื่อดูว่ามีกี่ไฟล์และส่วนไหนบ้างที่ได้รับผลกระทบ
- **The "Smallest Safe Correction" Standard:**
  - เมื่อพบ Architecture Debt หรือปัญหาทางโครงสร้าง **ห้ามเสนอแผนรื้อทำใหม่ทั้งระบบ (Total Rewrite) หรือขยาย Scope โดยพลการ**
  - ต้องเสนอการแก้ไขที่ **"เล็กที่สุดและปลอดภัยที่สุด"** เพื่ออุดช่องโหว่และคง Boundary เดิมไว้
- **Traceability Gate (ที่มาของข้อสรุป):**
  - ทุกข้อเสนอแนะในการปรับสถาปัตยกรรม ต้องระบุชัดเจนว่าสรุปจากโค้ดจริง `[Direct]` หรืออนุมาน `[Inferred]` ห้ามเดาสุ่ม

---

## 🏛️ 10. System Genesis & Major Redesign Protocol (กฎการวางรากฐานระบบใหม่)

> **Execution Trigger:** ใช้เฉพาะเมื่อ **ขึ้นระบบใหม่ตั้งแต่ต้น (New Project Setup)** หรือ **ปรับโครงสร้างสถาปัตยกรรมระดับระบบ (Major Redesign)** เท่านั้น (งานประจำวันทั่วไปให้ใช้ Fast Path เพื่อความรวดเร็ว)

เมื่อได้รับมอบหมายให้ออกแบบระบบใหม่ตั้งแต่ต้น หรือ Redesign สถาปัตยกรรม Agent จะต้องดำเนินการผ่าน 2 กลไกสำคัญ:

### 1. 🎙️ Domain Elicitation 4 แกน (เค้นความต้องการธุรกิจให้รอบด้าน)
ก่อนเริ่มลงมือ ให้ถามเพื่อความชัดเจนใน 4 แกนหลัก:
1. **👤 Actors & RBAC:** ระบบมี Role อะไรบ้าง? ใครมีสิทธิ์สร้าง/ดู/อนุมัติ/ลบ? มีการแยก Multi-Tenant ไหม?
2. **🔄 State Lifecycle:** สถานะของข้อมูลวิ่งอย่างไร? (เช่น `Draft` $\rightarrow$ `Pending` $\rightarrow$ `Approved` $\rightarrow$ `Rejected`) และในแต่ละสถานะมี Unhappy Path อย่างไร?
3. **⚡ Triggers & Side Effects:** เมื่อเกิด Action สำเร็จ มี Side Effects อะไรบ้าง? (ส่ง LINE Notify, ตัด Stock, หัก Wallet, สร้าง Invoice, ยิง Webhook)
4. **🛑 Business Constraints:** มีข้อจำกัดเฉพาะของธุรกิจไหม? (Limit รายวัน, ห้ามทำซ้ำ, ต้องแนบสลิป, สูตรคำนวณเฉพาะ)

### 2. 📋 8-Point Table-Stakes Baseline (มาตรฐานฟังก์ชันที่ต้องมีระดับ Production)
การออกแบบระบบใหม่ต้องครอบคลุม 8 ปัจจัยพื้นฐาน เพื่อป้องกันปัญหาระบบขาดฟังก์ชันที่ควรมี:
1. **UI & State UX:** มีครบ 4 สถานะ: `Loading (Skeleton)`, `Empty (หน้าว่างพร้อม CTA)`, `Error (พร้อมปุ่ม Retry)`, `Success`
2. **Edge Cases & Validation:** มี Schema Validation (Zod) ตรวจสอบละเอียดทั้งหน้าบ้านและหลังบ้าน
3. **Data Control:** รองรับ Pagination / Infinite Scroll, Debounced Search (300ms), และ Sorting/Filter
4. **Safety & Destruction:** มี Confirmation Dialog ก่อนการกระทำสำคัญ และใช้ Soft Delete แทน Hard Delete
5. **Feedback Loop:** แจ้งเตือนผู้ใช้ด้วย Toast Notification (Success/Error) และ Disable ปุ่มขณะกำลัง Submit ป้องกันกดย้ำ
6. **Security & RBAC Enforcement:** ตรวจสอบสิทธิ์ที่ Backend ซ้ำทุก API Endpoint ป้องกัน IDOR Bypass
7. **Idempotency & Concurrency:** ใช้ Transaction Lock (`$transaction`), Unique Constraint ป้องกัน Race Condition
8. **Audit & Tracking:** มีฟิลด์ `created_by`, `updated_at` และเก็บบันทึกประวัติการเปลี่ยนแปลง (Audit Log)



