# API Guidelines & Standards

> มาตรฐานในการสร้างและใช้งาน API 

## 1. RESTful Standards
- ใช้ Naming Conventions แบบ Noun และ Plural สำหรับ Resources (เช่น `/api/users`, ไม่ใช่ `/api/getUser`)
- ใช้ HTTP Methods ให้ถูกต้อง:
  - `GET` สำหรับดึงข้อมูล
  - `POST` สำหรับสร้างใหม่
  - `PUT`/`PATCH` สำหรับอัปเดต
  - `DELETE` สำหรับลบข้อมูล

## 2. Standardized JSON Responses
รูปแบบการคืนค่า (Response) ต้องเป็นมาตรฐานเดียวกันทั้งโปรเจกต์ เช่น:
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": { "pagination": ... }
}
```

## 3. HTTP Status Codes
- คืนค่า Status Code ที่สื่อความหมายชัดเจน:
  - `200 OK`, `201 Created`
  - `400 Bad Request` (กรณี Validation Failed)
  - `401 Unauthorized`, `403 Forbidden`
  - `404 Not Found`
  - `500 Internal Server Error`

## 4. Pagination & Filtering
- ข้อมูลที่เป็น List หรือ Array ใหญ่ๆ ต้องมี Pagination รองรับเสมอตั้งแต่แรกเริ่ม (limit, offset / cursor)

## 5. API Versioning
- ใช้ URL-based versioning เป็น default: `/api/v1/users`
- เมื่อมี breaking changes ให้สร้าง version ใหม่ (v2)
- Version เก่าต้อง deprecate ล่วงหน้าอย่างน้อย 3 เดือน (หรือ 2 releases)
- ส่ง `Deprecation` header ใน response ของ API ที่กำลังจะ deprecate
- Nuxt: จัดโครงสร้าง `server/api/v1/` และ `server/api/v2/` แยกกัน
  - Next.js: จัดโครงสร้าง `app/api/v1/` และ `app/api/v2/` แยกกัน

## 6. Error Response Standard
- Error response ต้องมีโครงสร้างที่ชัดเจน:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "ข้อมูลไม่ถูกต้อง",
    "details": [
      { "field": "email", "rule": "required", "message": "กรุณากรอกอีเมล" }
    ]
  }
}
```
- Error codes ต้องเป็น UPPER_SNAKE_CASE ที่สื่อความหมาย
- ห้ามส่ง stack trace หรือ internal error details ไปหา client

## 7. Request Validation
- ทุก endpoint ต้อง validate request ก่อนประมวลผล
- ใช้ Zod schema สำหรับ validate: body, query params, path params
- Nuxt/Nitro: ใช้ `readValidatedBody()` และ `getValidatedQuery()` เป็น default
  - Next.js: ใช้ Zod `.parse()` ร่วมกับ `NextRequest` ใน Route Handlers
- Validation errors ต้องคืนค่าเป็น 400 Bad Request พร้อม details

## 8. Timeout & Retry
- Server-side timeout: 30 วินาที (default), ปรับตาม endpoint
- Client-side retry: ใช้ exponential backoff (1s → 2s → 4s) สูงสุด 3 ครั้ง
- Retry เฉพาะ idempotent requests (GET) หรือ requests ที่มี idempotency key
- ห้าม retry 4xx errors (client errors) — retry เฉพาะ 5xx หรือ network errors

## 9. Idempotency
- POST/PUT requests ที่สำคัญ (เช่น สร้าง order, ทำธุรกรรม) ต้องรองรับ idempotency key
- Client ส่ง `Idempotency-Key` header (UUID)
- Server เก็บ key + response ไว้ 24 ชั่วโมง
- ถ้า key ซ้ำ → คืน response เดิมโดยไม่ทำซ้ำ

## 10. Pagination Guidance
- ตารางเปรียบเทียบ:
  - Offset-based (limit/offset): เหมาะกับ Admin panel, ข้อมูลคงที่ — ง่าย แต่ข้อมูลอาจหลุด/ซ้ำเมื่อมี insert ระหว่าง fetch
  - Cursor-based (after/before): เหมาะกับ Feed, Infinite scroll, Real-time — ไม่หลุด/ซ้ำ แต่กระโดดหน้าไม่ได้
  - เลือก Cursor-based เป็น default สำหรับ user-facing APIs
  - เลือก Offset-based สำหรับ Admin/backoffice APIs

## 11. Nuxt Server Routes Best Practices
- ใช้ `defineEventHandler` สำหรับทุก route
- จัดกลุ่ม routes ตาม resource: `server/api/users/`, `server/api/posts/`
- ใช้ `server/utils/` สำหรับ shared logic (DB client, validators)
- ใช้ `server/middleware/` สำหรับ auth, logging, rate limiting
- Return type ต้อง typed ชัดเจน (ไม่ใช่ `any`)

## 12. Next.js / React API Best Practices
- Next.js App Router: ใช้ Route Handlers (`route.ts`) ใน `app/api/`
- ใช้ `NextRequest` / `NextResponse` สำหรับ type-safe request/response
- จัดกลุ่ม routes ตาม resource: `app/api/users/route.ts`, `app/api/posts/route.ts`
- ใช้ middleware (`middleware.ts`) สำหรับ auth, rate limiting
- Return type ต้อง typed ชัดเจน (ไม่ใช่ `any`)
