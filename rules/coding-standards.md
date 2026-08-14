# Code Implementation Standards

> มาตรฐานการเขียนโค้ดที่รัดกุม (ถอดแบบมาจากกฎของ Nexus)

## 1. Strict Type Safety (No `any`)
- ห้ามใช้ `any` ใน TypeScript โดยเด็ดขาด 
- หากไม่แน่ใจใน Type ให้ใช้ `unknown` แล้วทำ Type Narrowing (การเช็ก Type ก่อนใช้งาน) เสมอ

## 2. Debuggable Error Handling (Try-Catch)
- เมื่อใช้บล็อก `try-catch` **ห้ามดัก Error แล้วทิ้ง (Swallow Error) เด็ดขาด**
- ในบล็อก `catch (error)` **ต้องพิมพ์ Error ต้นฉบับลง Server Log เสมอ** (เช่น `console.error('[Context] Error:', error)`) เพื่อให้หาบั๊กเจอ
- ค่าที่ Return กลับไปหา Client ให้ส่งเฉพาะข้อความที่ปลอดภัย (เช่น `Internal Server Error`) **ห้ามส่ง Raw Error** (เช่น Prisma Error หรือ SQL Syntax) ออกไปหา Client เด็ดขาด

## 3. No Placeholder Code
- เมื่อได้รับคำสั่งให้ "Implement" โค้ดที่สร้างออกมาต้องสมบูรณ์พร้อมนำไปรันได้จริง 100%
- ห้ามทิ้งคอมเมนต์แบบ `// TODO: implement this` เอาไว้ให้เจ้าของโปรเจกต์ทำเองเด็ดขาด

## 4. Naming Conventions
- Variables & Functions: `camelCase` (e.g., `getUserById`)
- Components: `PascalCase` (e.g., `UserProfile.vue`)
- Files/Directories: `kebab-case` (e.g., `user-profile.ts`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)
- Types/Interfaces: `PascalCase` with descriptive names (e.g., `UserCreateInput`)
- Database columns: ดูรายละเอียด Naming Conventions ที่ `rules/database-design.md` Section 10
- Environment variables: `UPPER_SNAKE_CASE` with prefix (e.g., `NUXT_PUBLIC_API_URL`)
- Boolean variables: prefix with `is`, `has`, `can`, `should` (e.g., `isActive`, `hasPermission`)

## 5. Code Organization
- Max file length: ~300 lines (ถ้าเกินให้ refactor แยกไฟล์)
- Import ordering: 1) Built-in modules, 2) External packages, 3) Internal modules, 4) Relative imports. แยก group ด้วยบรรทัดว่าง
- Dead code: ลบโค้ดที่ไม่ใช้ทันที ห้ามเก็บไว้เป็น comment (ใช้ Git history แทน)
- Barrel exports: ใช้ `index.ts` re-export เฉพาะ public API ของ module, ห้าม re-export ทุกอย่างแบบ wildcard
- Single responsibility: 1 ไฟล์ทำ 1 หน้าที่ ห้ามยัดหลาย concern ไว้ในไฟล์เดียว

## 6. Async/Await Best Practices
- ใช้ `Promise.all()` เมื่อมีหลาย async operations ที่ไม่ขึ้นต่อกัน (parallel)
- ใช้ sequential `await` เมื่อ operation ถัดไปขึ้นอยู่กับผลลัพธ์ก่อนหน้า
- ห้ามทิ้ง Promise โดยไม่ `await` หรือ `.catch()` (Unhandled Promise Rejection)
- ระวัง Race Conditions: ใช้ mutex/lock เมื่อ access shared resource
- ใช้ `Promise.allSettled()` เมื่อต้องการรอทุก promise แม้บางตัวจะ fail

## 7. Language-Agnostic Principles
- กฎใน Section 1-6 เน้น TypeScript แต่หลักการเหล่านี้ใช้ได้ทุกภาษา:
  - DRY (Don't Repeat Yourself) — แต่อย่า abstract เร็วเกินไป (Rule of Three)
  - KISS (Keep It Simple, Stupid)
  - YAGNI (You Aren't Gonna Need It)
  - Fail Fast — ตรวจสอบ preconditions ก่อนเริ่มทำงาน
  - Composition over Inheritance
