# 01. Security & Authentication Standards

> **Priority 1 (Must Follow):** กฎความปลอดภัยระดับสูงสุดของระบบ ความปลอดภัยมาก่อนเสมอ

---

## 1. Zero Trust Architecture
- **ห้ามไว้ใจ Input จาก Client เด็ดขาด:** ข้อมูลที่รับเข้ามาทั้งหมดต้องผ่าน Validation เสมอ (ใช้ **Zod** หรือ Library ที่ Type-safe)
- ตรวจสอบชนิดข้อมูล, ขนาด, รูปแบบ และ Sanitize ข้อมูลก่อนนำไปประมวลผลหรือบันทึกลง Database
- **PII & PDPA Masking (Privacy by Design):** ข้อมูลส่วนบุคคลที่มีความอ่อนไหว (เบอร์โทรศัพท์, เลขบัตรประจำตัวประชาชน, เลขบัญชีธนาคาร) ต้องผ่านการ Mask ด้วย Utility (`templates/utils/mask.ts`) ก่อนส่งคืนไปยัง Client หรือแสดงผลบนหน้า UI ทั่วไป เพื่อความสอดคล้องกับกฎหมาย PDPA

---

## 2. Authentication & Authorization (Better Auth & RBAC Standards)
- **Primary Authentication Engine (Better Auth):**
  - กำหนดให้ **Better Auth (`better-auth`)** เป็น Authentication Framework มาตรฐานหลัก (Default Standard) สำหรับทั้ง **Nuxt 4** (`@better-auth/vue`) และ **Next.js 15** (React App Router)
  - ใช้ `@better-auth/prisma-adapter` ร่วมกับ PostgreSQL เพื่อให้ Session, User, Account, และ Verification จัดการผ่าน Prisma ORM แบบ Native Type-Safe 100%
  - ใช้ Built-in Plugins ของ Better Auth ตามความเหมาะสม (Organization สำหรับ Multi-Tenancy/Teams, 2FA/Passkeys สำหรับ High-Security, Admin/Impersonation สำหรับ Debugging) แทนการเขียนระบบเองขึ้นมาใหม่ (Avoid Rolling Your Own Auth)
- **Token Storage & Dual Auth Extraction:** 
  - การส่ง Auth Token ฝั่ง Web Browser ควรส่งผ่าน `HttpOnly`, `Secure`, `SameSite=Lax/Strict` Cookies เพื่อป้องกัน XSS
  - Server Auth Middleware ต้องออกแบบเป็น **Dual Auth Handler** (ตรวจหา Token จาก `HttpOnly` Cookie ก่อน หากไม่พบให้ Fallback ไปตรวจที่ `Authorization: Bearer <token>` Header อัตโนมัติ) เพื่อให้ Endpoint เดียวกันรองรับได้ทั้ง Web, Mobile App และ External APIs
- **Token Expiration, Rotation & Grace Period (Anti-Zombie Token & Anti-Race Condition):**
  - **Access Token:** กำหนดอายุสั้น **5-15 นาที** (ลด Attack Window เมื่อ Token หลุด)
  - **Refresh Token:** อายุ 7-30 วัน พร้อมทำ Refresh Token Rotation (ออกใหม่และ Revoke ตัวเก่าทุกครั้งที่ใช้)
  - **Rotation Grace Period (15-30 วินาที):** ฝั่ง Server ต้องอนุญาต Grace Period สั้นๆ 15-30 วินาที ให้ Refresh Token ตัวเดิมที่เพิ่งถูกหมุนเวียนไป ยังสามารถนำมาแลกได้ชั่วคราว เพื่อป้องกัน Race Condition จากการที่ Client ยิง Parallel Requests พร้อมกันหลายเส้นตอน Access Token หมดอายุ หรือเปิดใช้งานพร้อมกันหลาย Browser Tabs
  - **Pragmatic Token Version Verification:** ตรวจสอบ `tokenVersion` หรือสถานะ `sessionId` กับ Database/Redis ใน 2 จังหวะสำคัญ: (1) ตอนทำ Token Refresh และ (2) ตอนทำธุรกรรมวิกฤต (Critical Mutations/Financial Endpoints) — **ห้าม Query DB เพื่อเช็ก tokenVersion ในทุกๆ Read Request ปกติ** เพื่อป้องกัน Database Bottleneck และรักษาข้อได้เปรียบด้าน Performance ของ JWT
  - ห้ามเก็บข้อมูลความลับ (เช่น รหัสผ่าน, PII) ไว้ใน JWT Payload
- **Dual-Layer Authorization & Multi-Tenant Scoping (Anti-IDOR / BOLA):**
  - ห้ามพึ่งพาเฉพาะ Client-side Route Guard หน้าบ้านเด็ดขาด
  - ทุก Server Endpoint / API Handler ต้องมี Middleware ตรวจสอบ Role และ Permissions ซ้ำ 100% ก่อนเข้าถึง Data Layer
  - **Automated Tenant Isolation:** สำหรับระบบ Multi-Tenant (เช่น หอพัก, ซักรีด, สาขา) ต้องใช้ Prisma Client Extension (`$extends.query`) หรือ Scoped Query Helper เพื่อบังคับใส่ `tenantId` / `organizationId` อัตโนมัติทุกครั้ง ห้ามพึ่งพาการเขียน `where: { tenantId }` แบบ Manual ทีละ Query *(⚠️ ข้อควรระวัง: Prisma Extension ไม่ครอบคลุม `$queryRaw` / `$executeRaw` ดังนั้นต้องระวังการใช้ Raw SQL และต้องใส่ tenantId กำกับใน Raw Query ด้วยตนเองเสมอ)*
- **Explicit Public Route Whitelist:** ทุก Global Auth Middleware หรือ Navigation Guard จะต้องประกาศตัวแปร `PUBLIC_ROUTES` ไว้อย่างชัดเจน (เช่น `['/', '/login', '/register', '/terms', '/privacy']`) ก่อนทำ Session Guard เสมอ เพื่อป้องกันไม่ให้เผลอดัก Redirect บล็อกหน้าแรก Public Showcase
- **Dev Quick-Login Hard Gate:** API หรือ Endpoint สำหรับช่วยล็อกอิน Dev/Test (ถ้ามี) ต้องเช็ก `if (process.env.APP_ENV === 'production' || process.env.NODE_ENV === 'production')` ที่บรรทัดแรก และคืนค่า `404 Not Found` ทันที

---

## 3. Secrets Management & Git Hygiene
- **ห้าม Hardcode API Keys, Passwords หรือ Secrets ลงใน Source Code เด็ดขาด** ให้ใช้ Environment Variables (`.env`) เสมอ
- **Client-Side Prefix Guard:** ห้ามนำ Secret Keys หรือ Private Credentials ไปใส่ในตัวแปรที่มี Prefix สำหรับ Browser (`NEXT_PUBLIC_*`, `NUXT_PUBLIC_*`, `VITE_*`) เด็ดขาด เพราะจะถูก Bundle รวมไปใน Client JS ทันที
- **Mandatory `.gitignore` Gate:** ทุกโปรเจกต์ต้องมี `.gitignore` ที่ระบุ `.env`, `.env.*`, `*.pem`, `*.key` เสมอ (อนุญาตเฉพาะ `.env.example` เท่านั้น)
- **Safe `.env.example`:** ทุกครั้งที่มีการเพิ่ม Env Variable ใหม่ ต้องอัปเดต `.env.example` ด้วยค่าว่าง (`KEY=""`) ห้ามใส่ค่าจริง
- **AI & Agent Artifact Isolation:** โฟลเดอร์ที่เกิดจากการทำงานของ AI (`.system_generated/`, `.gemini/`, `brain/`, `scratch/`) ต้องถูกระบุใน `.gitignore` หรือ `.git/info/exclude` เสมอ ห้าม Commit เข้า Repository ของโปรเจกต์
- **Fail-Fast Validation:** ตรวจสอบ ENV ทั้งหมดตอน App เริ่มทำงานด้วย Zod Schema
- **Memory Masking & Terminal Output Cleanliness:**
  - เมื่อบันทึกลงหน่วยความจำถาวรหรือสมองกล (Persistent Memory / AI Memory / Nexus) ให้ใช้ Masking Pattern `<secret:VAR_NAME>`
  - ❌ **ห้ามสั่งพิมพ์ค่า Environment ทั้งหมดลง Terminal** (เช่น `env`, `printenv`, `console.log(process.env)`) เพราะจะทำให้ Secret รั่วไหลลงใน Agent Transcripts/Logs ทันที

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

## 6. Rate Limiting (Distributed & Memory Layering)
กำหนด Rate Limiting ในทุก Public Endpoint:
- **Auth Endpoints (Login/Register/Reset-Password):** 5-10 requests / minute / IP
- **General APIs:** 100-200 requests / minute / IP
- **File Upload:** 10 requests / minute / IP
- **Distributed Storage Requirement:** สำหรับ Production ที่มีหลาย Container Replicas หรือรันบน Serverless (Cloudflare/Vercel) **ต้องใช้ Redis (Upstash / Valkey / Redis Cluster)** เป็น Storage สำหรับนับ Hit Counter ป้องกันการ Bypass ผ่าน Node สลับเครื่อง (In-memory อนุญาตเฉพาะ Local Dev เท่านั้น)
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
- **Immediate Session Revocation:** เมื่อผู้ใช้ Logout หรือเปลี่ยนรหัสผ่าน ต้องทำลาย Token ฝั่ง Client (ลบ Cookie) และเพิกถอน Session ฝั่ง Server (อัปเดต `tokenVersion` หรือลบ Session Record ใน DB/Redis) ทันที

---

## 9. File Upload & Media Security (Anti-Stored XSS & Polyglots)
- ตรวจสอบไฟล์ด้วย Extension + MIME Type + Magic Bytes (File Signature)
- **SVG Upload Guard:**
  - ห้ามเปิดให้ Upload ไฟล์ SVG โดยตรงหากไม่จำเป็น
  - หากจำเป็นต้องรับ SVG ต้องผ่านกระบวนการ Sanitize ด้วย **DOMPurify** (ฝั่ง Server) เพื่อตัดแท็ก `<script>`, `onload`, `javascript:` ทั้งหมดทิ้ง
- **Image Re-encoding & Metadata Stripping:** สำหรับไฟล์ภาพทั่วไป (JPEG/PNG) แนะนำให้ประมวลผลผ่าน `sharp` เพื่อแปลงเป็น WebP/PNG ใหม่ และลบ EXIF/GPS Metadata ทิ้ง ป้องกันทั้ง Polyglot Malicious Payloads และ Privacy Leakage
- จำกัดขนาดไฟล์อย่างเข้มงวด (เช่น รูปภาพไม่เกิน 10MB, เอกสารไม่เกิน 50MB)
- เปลี่ยนชื่อไฟล์เป็น UUID เสมอเพื่อป้องกัน Path Traversal
- จัดเก็บไฟล์อัปโหลดไว้นอก Public Web Root หรือเก็บบน Cloud Storage (S3 / R2) ที่มี Pre-signed URLs

---

## 10. Dependency Security
- รัน `pnpm audit` หรือ `npm audit` ก่อน Release ทุกครั้ง
- ตั้งค่า Renovate หรือ Dependabot สำหรับ Update Security Patches
- ล็อก Dependency Versions ด้วย Lock File (`pnpm-lock.yaml` / `package-lock.json`)
