# 01. Security & Authentication Standards

> **Priority 1 (Must Follow):** กฎความปลอดภัยระดับสูงสุดของระบบ ความปลอดภัยมาก่อนเสมอ

---

## 1. Zero Trust Architecture
- **ห้ามไว้ใจ Input จาก Client เด็ดขาด:** ข้อมูลที่รับเข้ามาทั้งหมดต้องผ่าน Validation เสมอ (ใช้ **Zod** หรือ Library ที่ Type-safe)
- ตรวจสอบชนิดข้อมูล, ขนาด, รูปแบบ และ Sanitize ข้อมูลก่อนนำไปประมวลผลหรือบันทึกลง Database

---

## 2. Authentication & Authorization (RBAC)
- **Token Storage:** การส่ง Auth Token ควรส่งผ่าน `HttpOnly`, `Secure`, `SameSite=Lax/Strict` Cookies เพื่อป้องกัน XSS หรือส่งผ่าน `Authorization: Bearer <token>` Header สำหรับ Mobile/External APIs
- **Token Expiration & Rotation:**
  - Access Token อายุ 15-30 นาที
  - Refresh Token อายุ 7-30 วัน พร้อมทำ Refresh Token Rotation (ออกใหม่และ revoke ตัวเก่าทุกครั้งที่ใช้)
  - ห้ามเก็บข้อมูลความลับ (เช่น รหัสผ่าน, PII) ไว้ใน JWT Payload
- **Dual-Layer Authorization:**
  - ห้ามพึ่งพาเฉพาะ Client-side Route Guard หน้าบ้านเด็ดขาด
  - ทุก Server Endpoint / API Handler ต้องมี Middleware ตรวจสอบ Role และ Permissions ซ้ำ 100% ก่อนเข้าถึง Data Layer
- **Dev Quick-Login Hard Gate:** API หรือ Endpoint สำหรับช่วยล็อกอิน Dev/Test (ถ้ามี) ต้องเช็ก `if (process.env.APP_ENV === 'production' || process.env.NODE_ENV === 'production')` ที่บรรทัดแรก และคืนค่า `404 Not Found` ทันที

---

## 3. Secrets Management
- **ห้าม Hardcode API Keys, Passwords หรือ Secrets ลงใน Source Code เด็ดขาด** ให้ใช้ Environment Variables (`.env`) เสมอ
- ตรวจสอบ ENV ทั้งหมดตอน App เริ่มทำงาน (Fail Fast) ด้วย Zod Schema
- เมื่อบันทึกลงหน่วยความจำถาวรหรือสมองกล (Persistent Memory / AI Memory / Nexus) ให้ใช้ Masking Pattern `<secret:VAR_NAME>`

---

## 4. CORS Policy
- ห้ามใช้ `Access-Control-Allow-Origin: *` บน Production เด็ดขาด
- ต้องกำหนด Whitelist ของ Allowed Origins ที่ชัดเจน
- ระบุเฉพาะ HTTP Methods และ Headers ที่จำเป็นเท่านั้น
- กำหนด `Access-Control-Max-Age` เพื่อ Cache preflight requests

---

## 5. Security Headers
ต้องตั้งค่า Security Headers ต่อไปนี้ในทุก HTTP Response:
- `Content-Security-Policy` — ป้องกัน XSS และจำกัดแหล่งโหลด Resource
- `X-Content-Type-Options: nosniff` — ป้องกัน MIME type sniffing
- `X-Frame-Options: DENY` — ป้องกัน Clickjacking
- `Strict-Transport-Security` (HSTS) — บังคับเชื่อมต่อผ่าน HTTPS
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — ปิดการใช้งาน Browser Features ที่ไม่จำเป็น
*(แนะนำใช้ `nuxt-security` สำหรับ Nuxt หรือ Helmet/Next.js config สำหรับ React)*

---

## 6. Rate Limiting
กำหนด Rate Limiting ในทุก Public Endpoint:
- **Auth Endpoints (Login/Register):** 5-10 requests / minute / IP
- **General APIs:** 100-200 requests / minute / IP
- **File Upload:** 10 requests / minute / IP
- ส่งคืน Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` และส่งคืน `429 Too Many Requests` เมื่อเกินลิมิต

---

## 7. CSRF Protection
- สำหรับ Cookie-based Auth ต้องเปิดใช้งาน CSRF Protection เสมอ
- ตั้งค่า `SameSite=Lax` หรือ `SameSite=Strict` ใน Cookie
- **Nuxt:** ใช้ `useCsrfToken()` composable หรือ Nitro CSRF middleware
- **Next.js:** Server Actions มี built-in Host/Origin verification, สำหรับ Route Handlers ให้ตรวจ `Origin` และ `Referer`
- **React (Vite SPA):** ใช้ Custom Header (`X-Requested-With: XMLHttpRequest`) หรือ CSRF Double Submit Cookie Pattern

---

## 8. Password & Session Security
- ห้ามเก็บ Password เป็น Plaintext เด็ดขาด
- ใช้ **Argon2id** (แนะนำ) หรือ **bcrypt** สำหรับ Password Hashing
- กำหนดความยาวรหัสผ่านอย่างน้อย 8 ตัวอักษรขึ้นไป
- ห้าม Log ค่า Password แม้จะผ่านการ Hash แล้วก็ตาม
- **Session Revocation:** เมื่อผู้ใช้ Logout ต้องทำลาย Token ทั้งฝั่ง Client (ลบ Cookie) และฝั่ง Server (Blacklist / Delete Session from DB)

---

## 9. File Upload Security
- ตรวจสอบไฟล์ด้วย Extension + MIME Type + Magic Bytes (File Signature)
- จำกัดขนาดไฟล์อย่างเข้มงวด (เช่น รูปภาพไม่เกิน 10MB, เอกสารไม่เกิน 50MB)
- เปลี่ยนชื่อไฟล์เป็น UUID เสมอเพื่อป้องกัน Path Traversal
- จัดเก็บไฟล์อัปโหลดไว้นอก Public Web Root หรือเก็บบน Cloud Storage (S3 / R2) ที่มี Pre-signed URLs

---

## 10. Dependency Security
- รัน `pnpm audit` หรือ `npm audit` ก่อน Release ทุกครั้ง
- ตั้งค่า Renovate หรือ Dependabot สำหรับ Update Security Patches
- ล็อก Dependency Versions ด้วย Lock File (`pnpm-lock.yaml` / `package-lock.json`)
