# 06. Testing, DevOps & Observability Standards

> **Priority 6:** มาตรฐานการทดสอบอัตโนมัติ โครงสร้างพื้นฐาน Docker, CI/CD และระบบติดตามข้อผิดพลาด

---

## 🧪 1. Automated Testing Standards
- **Test Runner:** ใช้ **Vitest** เป็น Default Test Runner (เร็วกว่า, รองรับ ESM Native & TypeScript)
- **API Mocking:** ใช้ **MSW (Mock Service Worker)** สำหรับ Mock Network Requests
- **E2E Testing:** ใช้ **Playwright** สำหรับทดสอบ End-to-End User Journey
- **Coverage Target:** มุ่งเน้น Branch Coverage ใน Core Business Logic และ Payment/Auth Flows ให้เกิน 80%+
- **Test Isolation & Zero DB Pollution:**
  - Database Test ต้องแยกขาดจาก Production/Dev DB
  - ใช้ Transaction Rollback หรือ In-Memory/Isolated DB ทุกครั้งเพื่อป้องกัน Data Pollution
  - **Existing Test Account Reuse:** หากระบบเดิมมีบัญชีทดสอบ/Seed อยู่แล้ว ให้ดึง Credential เดิมมาใช้ทดสอบ ห้าม Insert ข้อมูลซ้ำซ้อน
  - **Ask Before Mocking:** หากระบบไม่มีบัญชีทดสอบ ให้ถามผู้ใช้ก่อนสร้าง Mock Test Seed เสมอ

---

## 💻 2. Local-First Development & Deployment Standards
- **Local Dev First (Default Workflow):** เน้นการพัฒนาและรันเทสต์แบบ Native Local Environment ด้วย **`pnpm`** (`pnpm dev`, `pnpm test`, `pnpm build`) ร่วมกับ Local PostgreSQL เพื่อความเร็วสูงสุดและตรงตาม User Preferences
- **Docker Policy (On-Demand Only):** **ห้ามใช้ Docker หรือสร้าง Dockerfile/Compose เองโดยพลการ — จะใช้งาน Docker เฉพาะเมื่อได้รับคำสั่งชัดเจนจากผู้ใช้เท่านั้น (On-Demand Only)**
  - เมื่อได้รับคำสั่งให้ทำ Docker: แยก Multi-stage build, รัน Non-root, Pin base image (`node:20-alpine`)

---

## 🚀 3. CI/CD Pipeline (GitHub Actions)
- Workflow มาตรฐาน: `Build` $\rightarrow$ `Lint` $\rightarrow$ `TypeCheck` $\rightarrow$ `Test` $\rightarrow$ `Deploy`
- **Staging Deployment:** Auto-deploy ไปยัง Staging เมื่อ Push โค้ดเข้า branch `develop`
- **Production Deployment:** Deploy ขึ้น Production เมื่อ Push โค้ดเข้า branch `main`
- **Solo Developer:** อนุญาตให้ Deploy ตรงจาก `main` ได้โดยไม่ต้องรอ PR Review

---

## 📊 4. Observability & Structured Logging
- **Logger:** ใช้ **Pino** เป็น JSON Structured Logger หลัก
- **Log Contents:** ทุก Request Log ต้องมี `requestId` (Correlation ID), `method`, `path`, `statusCode`, และ `duration`
- **PII & Secrets Masking:** ห้ามบันทึก Passwords, Tokens, API Keys, ข้อมูลบัตรเครดิต หรือข้อมูลส่วนบุคคล (PII) ลงใน Log เด็ดขาด
- **Health Check Endpoint:** สร้าง `/api/health` ส่งคืน `{ status: 'ok', uptime, db: 'connected' }` พร้อมเช็กสถานะการเชื่อมต่อ Database จริง

---

## 🚨 5. Error Tracking (Sentry)
- ติดตั้ง Sentry สำหรับ Production Error Monitoring
- แยก **Operational Errors** (4xx, จัดการได้) ออกจาก **Programmer Errors** (Unhandled crashes, ส่ง Sentry เสมอ)
- อัปโหลด Source Maps เฉพาะตอน Build Production

---

## ⚡ 6. Tiered Verification Hierarchy & Build Efficiency (กฎการทดสอบตามขนาดงาน)

- **Anti-Build-Bloat Principle (กฎเหล็ก):**
  - คำสั่ง `pnpm run build` (หรือ `nuxt build`, `next build`) ทำการ Bundle, Minify, และ Prerender ทั้งระบบ ซึ่งกินเวลาตั้งแต่ 30 วินาที ถึงหลายนาทีในโปรเจกต์ขนาดใหญ่
  - ❌ **ห้ามรัน `pnpm run build` ทุกครั้งที่แก้โค้ดเล็กๆ เด็ดขาด** (เช่น การแก้ CSS, ปรับแต่งสีปุ่ม, แก้วรรคตอน, หรือแก้ฟังก์ชันเดี่ยว)

- **ลำดับขั้นการตรวจสอบ (Tiered Hierarchy):**
  1. **Tier 1: Fast TypeCheck (1-3 วินาที) [Default Gate สำหรับทุกงาน]:**
     - **Nuxt 4 / Vue:** `pnpm vue-tsc --noEmit` (หรือ `npx vue-tsc --noEmit`)
     - **React / Next.js:** `pnpm tsc --noEmit` (หรือ `npx tsc --noEmit`)
     - *ประโยชน์:* ตรวจสอบ Type Safety, Props, Broken Imports, และ Syntax Error ครบ 100% ในหน่วยความจำโดยไม่เสียเวลา Bundle ไฟล์ลงดิสก์
  2. **Tier 2: Targeted Logic / Unit Test (2-5 วินาที) [สำหรับงาน Logic/API]:**
     - รันเทสต์เฉพาะไฟล์: `pnpm vitest run path/to/file.test.ts`
     - หรือรัน inline Node assertion script เพื่อพิสูจน์ว่า Logic ทำงานถูกต้อง
  3. **Tier 3: Full Production Build (`pnpm run build`) [สงวนไว้เฉพาะ 3 กรณี]:**
     - 1) เมื่อมีการแก้ไข Global Framework Config (เช่น `nuxt.config.ts`, `next.config.js`, `tailwind.config.js`, `package.json`)
     - 2) เมื่อทำการย้ายโครงสร้างโปรเจกต์ครั้งใหญ่ (Major Refactoring / Global Route Migration)
     - 3) ก่อนส่งมอบงาน Release ก้อนสุดท้าย (Final Delivery Milestone) หรือเมื่อผู้ใช้สั่งให้รัน Full Build ชัดเจน
