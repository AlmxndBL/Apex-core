# Security & Authentication

> กฎด้านความปลอดภัย และระบบยืนยันตัวตน (Must Follow)

## 1. Zero Trust Architecture
- **อย่าไว้ใจ Input จากฝั่ง Client เด็ดขาด** 
- ข้อมูลที่รับเข้ามาทั้งหมดต้องผ่าน Validation เสมอ (แนะนำให้ใช้ **Zod** หรือ Library ที่ Type-safe)

## 2. Authentication & Authorization
- หากใช้ JWT (JSON Web Tokens), ห้ามเก็บข้อมูลลับไว้ใน Payload 
- การส่ง Token ควรส่งผ่าน `HttpOnly` Cookies เพื่อป้องกัน XSS หรือใส่ใน `Authorization: Bearer` Header หากเป็น Mobile API
- ต้องเช็ก Role/Permission (Authorization) ทุก Endpoint ก่อนทำงานกับ Database

## 3. Safe Error Handling
- ห้ามคืน Raw Error (เช่น Stack trace, SQL Syntax) กลับไปหา Client โดยเด็ดขาด ให้คืนค่าแค่ `Internal Server Error`
- ต้อง Log ค่า Error ต้นฉบับไว้ที่ Server เสมอ เพื่อการ Debug

## 4. Secrets Management
- ห้าม Hardcode API Keys หรือ Secrets ลงในโค้ด ให้ใช้ Environment Variables เสมอ (`.env`)
- เมื่อจะบันทึกลงสมอง (Nexus) ให้ใช้ Pattern `<secret:VAR_NAME>`

## 5. CORS Policy
- ห้ามใช้ `Access-Control-Allow-Origin: *` ใน production เด็ดขาด
- ต้องกำหนด whitelist ของ allowed origins อย่างชัดเจน
- ระบุ allowed methods และ headers ที่จำเป็นเท่านั้น
- ตั้ง `Access-Control-Max-Age` เพื่อ cache preflight requests

## 6. Security Headers
- ต้องตั้ง headers เหล่านี้ในทุก response:
  - `Content-Security-Policy` — ป้องกัน XSS, restrict sources
  - `X-Content-Type-Options: nosniff` — ป้องกัน MIME sniffing
  - `X-Frame-Options: DENY` — ป้องกัน Clickjacking
  - `Strict-Transport-Security` (HSTS) — บังคับ HTTPS
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` — จำกัด browser features (camera, microphone, etc.)
- แนะนำใช้ Nuxt Security module (`nuxt-security`) เป็น default

## 7. Rate Limiting
- ต้องมี Rate Limiting ในทุก public API endpoint
- กำหนดขีดจำกัดตาม endpoint sensitivity:
  - Auth endpoints (login, register): 5-10 requests/minute/IP
  - General API: 100-200 requests/minute/IP
  - File upload: 10 requests/minute/IP
- ใช้ sliding window algorithm เป็น default
- คืน headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- คืน `429 Too Many Requests` เมื่อเกินขีดจำกัด

## 8. CSRF Protection
- สำหรับ Cookie-based authentication ต้องมี CSRF protection เสมอ
- ตั้ง `SameSite=Lax` หรือ `SameSite=Strict` ใน cookie attribute
- ใช้ CSRF token สำหรับ state-changing requests (POST, PUT, DELETE)
- Nuxt: ใช้ `useCsrfToken()` composable หรือ middleware

## 9. Password Security
- ห้ามเก็บ password เป็น plaintext เด็ดขาด
- ใช้ **Argon2id** (แนะนำ) หรือ **bcrypt** (minimum) สำหรับ hashing
- Minimum password requirements: 8+ characters, ไม่จำเป็นต้องบังคับ special chars (NIST 800-63B)
- ตรวจสอบกับรายการ breached passwords (เช่น Have I Been Pwned API)
- ห้าม log password แม้จะ hashed แล้ว

## 10. Session Management
- Access Token expiration: 15-30 นาที
- Refresh Token expiration: 7-30 วัน
- Refresh Token Rotation: ออก refresh token ใหม่ทุกครั้งที่ใช้ + revoke ตัวเก่า
- Concurrent Sessions: กำหนดจำนวน session สูงสุดต่อ user (เช่น 5)
- Logout: ต้อง revoke token ทั้งฝั่ง client (ลบ cookie) และ server (blacklist/delete from DB)
- Idle timeout: auto-logout หลังไม่มี activity (เช่น 30 นาที สำหรับระบบที่มีข้อมูลสำคัญ)

## 11. File Upload Security
- ตรวจสอบ file type ด้วยทั้ง extension + MIME type + magic bytes (file signature)
- จำกัดขนาดไฟล์ (เช่น 10MB สำหรับ images, 50MB สำหรับ documents)
- เก็บไฟล์ upload นอก web root (ห้ามเข้าถึงตรงผ่าน URL)
- Rename ไฟล์ด้วย UUID ป้องกัน path traversal
- Scan malware ถ้าเป็นไปได้ (ClamAV หรือ cloud service)

## 12. Dependency Security
- รัน `npm audit` หรือ `pnpm audit` ก่อนทุก release
- ตั้ง Dependabot หรือ Renovate สำหรับ auto-update security patches
- ตรวจสอบ license compatibility ของ dependencies
- ล็อก dependency versions (`package-lock.json` / `pnpm-lock.yaml`)
