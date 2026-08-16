# 06. Testing, DevOps & Observability Standards

> **Priority 6:** มาตรฐานการทดสอบอัตโนมัติ โครงสร้างพื้นฐาน Docker, CI/CD และระบบติดตามข้อผิดพลาด

---

## 🧪 1. Automated Testing Standards
- **Test Runner:** ใช้ **Vitest** เป็น Default Test Runner (เร็วกว่า, รองรับ ESM Native & TypeScript)
- **API Mocking:** ใช้ **MSW (Mock Service Worker)** สำหรับ Mock Network Requests
- **E2E Testing:** ใช้ **Playwright** สำหรับทดสอบ End-to-End User Journey
- **Coverage Target:** มุ่งเน้น Branch Coverage ใน Core Business Logic และ Payment/Auth Flows ให้เกิน 80%+
- **Test Isolation:**
  - Database Test ต้องแยกขาดจาก Production/Dev DB
  - ใช้ Transaction Rollback หรือ In-Memory/Isolated DB ทุกครั้งเพื่อป้องกัน Data Pollution

---

## 🐳 2. Docker & Containerization Standards
- **Multi-Stage Builds:** แยก Build Stage ออกจาก Production Stage เสมอ เพื่อให้ Image มีขนาดเล็กและปลอดภัย
- **Security:** รัน Container ในฐานะ Non-root User
- **Base Image:** Pin เวอร์ชันอย่างชัดเจน (เช่น `node:20-alpine`) ห้ามใช้ `latest`
- **Docker Compose:** ใช้สำหรับ Development ในเครื่อง ประกอบด้วย App + PostgreSQL + Redis (ถ้ามี) พร้อม Volume Mounts รองรับ Hot Reload

---

## 🚀 3. CI/CD Pipeline (GitHub Actions)
- Workflow มาตรฐาน: `Build` $\rightarrow$ `Lint` $\rightarrow$ `TypeCheck` $\rightarrow$ `Test` $\rightarrow$ `Docker Build` $\rightarrow$ `Deploy`
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
