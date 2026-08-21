# 02. Coding Standards & Conventions

> **Priority 2:** มาตรฐานการเขียนโค้ดและระเบียบปฏิบัติระดับ Production-Ready

---

## 1. Strict Type Safety (No `any`)
- **ห้ามใช้ `any` ใน TypeScript โดยเด็ดขาด**
- หากไม่แน่ใจในโครงสร้างข้อมูล ให้ใช้ `unknown` แล้วทำ **Type Narrowing** (เช่น Type Guards, Zod validation) เสมอ
- ระบุ Type ของ Parameter, Function Return Type, และ State ให้ชัดเจน

---

## 2. Debuggable Error Handling
- **ห้าม Swallow Error:** เมื่อใช้บล็อก `try-catch` ห้ามดักจับ Error แล้วปล่อยเงียบทิ้งไปเด็ดขาด
- **Log ต้นฉบับที่ Server:** ในบล็อก `catch (error)` ต้องพิมพ์ Original Error พร้อม Context ลง Logger เสมอ เช่น `console.error('[Context] Failed to fetch user:', error)`
- **Safe Client Error Response:** ค่าที่ส่งกลับไปยัง Client ต้องเป็นข้อความทั่วไปที่ปลอดภัย (เช่น `INTERNAL_SERVER_ERROR`) **ห้ามส่ง Raw SQL Error หรือ Stack Trace ออกไปหา Client เด็ดขาด**

---

## 3. No Placeholder Code
- โค้ดที่สร้างขึ้นต้องสมบูรณ์พร้อมรันได้จริง 100%
- **ห้ามทิ้งคอมเมนต์แบบ `// TODO: implement this`** หรือโครงฟังก์ชันว่างเอาไว้ให้เจ้าของโปรเจกต์ทำเอง

---

## 4. Naming Conventions & Organization
- **Variables & Functions:** `camelCase` (e.g., `getUserById`, `calculateTotal`)
- **Components & Classes:** `PascalCase` (e.g., `UserProfile.vue`, `AuthModal.tsx`)
- **Files & Directories:** `kebab-case` (e.g., `user-profile.ts`, `auth-service/`)
- **Constants & Enums:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`)
- **Types & Interfaces:** `PascalCase` (e.g., `UserCreateInput`, `ApiResponse<T>`)
- **Booleans:** ขึ้นต้นด้วย `is`, `has`, `can`, `should` (e.g., `isActive`, `hasPermission`)
- **File Length Limits:**
  - Backend Logic / Services: สูงสุด **~300 บรรทัด** (หากเกินให้ Refactor แยกโมดูล)
  - UI Components: สูงสุด **~200 บรรทัด** (หากเกินให้ย่อยเป็น Sub-components)
- **Import Ordering:** 1) Built-in modules, 2) External packages, 3) Internal/Shared, 4) Relative imports (คั่นด้วยบรรทัดว่าง)
- **Dead Code:** ลบโค้ดที่ไม่ใช้ทิ้งทันที ห้ามเก็บไว้เป็น Comment

---

## 5. Async / Await & Runtime Logic Best Practices
- **ห้ามใช้ `Array.prototype.forEach` กับ Async Callbacks เด็ดขาด:** เพราะ `forEach` ไม่รอ `await` และกลืน Error ทิ้ง $\rightarrow$ ให้ใช้ `for (const item of items)` สำหรับงานเรียงลำดับ หรือ `await Promise.all(items.map(...))` สำหรับงาน Parallel
- **Nullish Coalescing Guard (`??` vs `||`):** สำหรับตัวเลข (เช่น `0`) และ Boolean (`false`) **ต้องใช้ `??` เสมอ** ห้ามใช้ `||` เพราะจะทำให้ค่า `0` หรือ `false` ถูกทับด้วย Default Value
- **Component Props Immutability:** ห้ามแก้ไข (Mutate) Property ใน Object/Array ที่ส่งผ่าน Props เข้ามาโดยตรง ให้ใช้ `emit('update:modelValue')` หรือโคลน State ก่อนแก้ไข
- **Memory Leak & Listener Cleanup:** Event Listeners (`window.addEventListener`), Subscriptions, หรือ Timers (`setInterval`) ที่ผูกใน Component ต้องมี Cleanup ใน `onUnmounted()` (Vue) หรือ return cleanup function ใน `useEffect()` (React) เสมอ
- **React Hook Dependencies & Stale Closures:** ใน React `useEffect` / `useCallback` / `useMemo` ต้องใส่ Exhaustive Dependencies ให้ครบ เพื่อป้องกัน Stale State Bugs
- **React Server Actions Zero Trust:** Server Actions (`"use server"`) ถือเป็น Public HTTP Endpoints เสมอ — **ต้อง Validate Input ด้วย Zod และตรวจสอบ Session/Role ก่อนประมวลผลทุกครั้ง**
- ใช้ `Promise.all()` เมื่อมี Asynchronous Operations หลายตัวที่ไม่ขึ้นต่อกัน (Parallel execution)
- ห้ามปล่อย Promise ทิ้งไว้โดยไม่ `await` หรือ `.catch()` (ป้องกัน Unhandled Rejection)
- ระวัง Race Conditions: ใช้ `AbortController` ใน Search/Debounce และใช้ Optimistic Locking เมื่อแก้ไข Shared Database Resource

---

## 6. Git & Commit Conventions
- **Conventional Commits:** รูปแบบ `type(scope): description` (Description ตัวพิมพ์เล็ก ไม่เกิน 72 ตัวอักษร)
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
- **Branch Naming:** `feature/xxx`, `fix/xxx`, `hotfix/xxx`, `release/xxx`
- **Solo Developer Exception:** 
  - ในการทำงานแบบทีม ให้แตก Branch จาก `develop` และรวมผ่าน PR
  - สำหรับ **Solo Developer** อนุญาตให้ Push ตรงเข้า `main` ได้ และ Bypass PR review ได้ตามความคล่องตัว

---

## 7. Documentation & Code Comments
- **Comment WHY, not WHAT:** คอมเมนต์เฉพาะ "เหตุผลในการตัดสินใจ" หรือ "ทำไมต้องเขียนแบบนี้" ไม่คอมเมนต์อธิบายสิ่งที่โค้ดบอกตัวเองอยู่แล้ว
- ใช้ **JSDoc / TSDoc** สำหรับ Public Functions, Shared Composables, และ Interfaces
- **Architecture Decision Records (ADRs):** บันทึกการตัดสินใจทางเทคนิคสำคัญลงใน `docs/adr/`

---

## 8. Intent-Based Tool Safety, Refactoring & Package Manager Standards
- **Strict Package Manager Awareness:** ตรวจสอบ Lockfile เสมอ (`pnpm` vs `npm` vs `bun` vs `yarn`) ห้ามรันคำสั่งผิด package manager
- **Zero Guesswork & Mathematical Code Verification:**
  - ห้ามเดาสุ่มตัวเลข CSS, Spacing, หรือ Utility Classes ที่ไม่มีอยู่จริง (เช่น คลาสเดา `w-13`, `w-5.5`)
  - ทุกการคำนวณตำแหน่ง (Positioning), การเลื่อน (Translate), หรือสัดส่วน (Aspect Ratio) ต้องผ่านสูตรเรขาคณิตและหน่วยวัดที่ชัดเจน
- **Investigative / Audit Safe Mode:** 
  - เมื่อได้รับคำสั่งให้ "หาสาเหตุ", "วิเคราะห์", หรือ "Audit" ให้ใช้เฉพาะ Read Tools (`view_file`, `grep_search`, `find_by_name`, `list_dir`)
  - **ห้ามแตะ Write/Edit Tools หรือรัน DB Migration โดยไม่ได้รับคำสั่งอนุมัติ Explicit จากผู้ใช้ก่อนเด็ดขาด**
- **Atomic Refactoring & Zero Legacy Clutter:**
  - เมื่อย้ายเส้นทางโฟลเดอร์หรือเปลี่ยนโครงสร้าง Route (เช่น ย้ายไป `/admin/` หรือ `/tenant/`) **ต้องลบไฟล์เก่า (Legacy Routes) ทิ้งใน Step เดียวกันทันที** ห้ามปล่อยให้ไฟล์เดิมอยู่คู่กับไฟล์ใหม่เด็ดขาด
- **Tool Transparency & Anti-Hidden Scripting:**
  - การแก้ไขหรือสร้างไฟล์โปรเจกต์ต้องทำผ่าน Native Tools (`replace_file_content`, `write_to_file`) ที่แสดง Diff และ Path ชัดเจน
  - **ห้ามสร้างหรือรัน Batch Script ชั่วคราวใน `/scratch/` เพื่อแอบแก้ไขโค้ดโปรเจกต์แบบทึบเด็ดขาด**
- **Idempotent DB Migrations & Seeding:** คำสั่งแก้ไข Schema หรือ Seed Data ต้องปลอดภัยต่อข้อมูลเดิม และไม่ก่อให้เกิด DB Pollution ในระหว่างการทดสอบ

---

## 9. Stack-Specific Gotchas & Architecture Lessons

### A. Nuxt 4 + Prisma 7 Driver Adapter Rule
- **Driver Adapter Mandatory:** Prisma v7 บังคับใช้งานผ่าน Driver Adapter (เช่น `@prisma/adapter-pg` สำหรับ PostgreSQL)
- **Singleton Pattern:** ใน `server/utils/prisma.ts` ต้องสร้าง Pool และส่งต่อให้ `new PrismaClient({ adapter })` เสมอ ห้ามเรียก `new PrismaClient()` เปล่าๆ เด็ดขาด

### B. Next.js 15 & React 19 Server Components / Actions Rule
- **RSC Boundary Discipline:** ใช้ `'use client'` เฉพาะส่วนที่จำเป็นต้องมี Interactive State (`useState`, `useEffect`, Event Handlers) เท่านั้น — ห้ามใส่ `'use client'` คลุมทั้งหน้า
- **Non-Serializable Props Guard:** ห้ามส่งฟังก์ชัน หรือ Class Instance จาก Server Component ข้ามไปยัง Client Component เด็ดขาด
- **Hydration Mismatch Prevention:** หลีกเลี่ยงการเรนเดอร์ค่าที่ขึ้นกับ Environment (`window`, `localStorage`, `Date.now()`, `Math.random()`) ในขั้นตอน Initial SSR Render

### C. PostCSS & CSS File Structure
- **@import Precedence:** คำสั่ง `@import url(...);` สำหรับโหลดฟอนต์ภายนอก **ต้องอยู่บรรทัดแรกสุดของไฟล์ CSS** ก่อน `@tailwind base;` หรือคำสั่ง CSS อื่นๆ เสมอ เพื่อป้องกัน PostCSS parser warning

### D. Typed Auth Function Returns
- ฟังก์ชัน `login()` ใน Composable / Custom Hook (`useAuth`) **ต้อง Return Typed User Object (`UserProfile | null`) เสมอ** ห้าม Return แค่ Boolean `true` เพื่อป้องกันกรณีที่หน้าเรียกใช้เข้าถึง `res.role` แล้วได้ `undefined` ทำให้ Routing ทำงานผิดพลาด

### E. Pre-Refactoring Dead Code Cleanup Protocol
- เมื่อทำการยกระดับสถาปัตยกรรม (เช่น เปลี่ยนเป็น Dual-Role RBAC หรือแยก Version `/api/v1/*`) **ต้องลบไฟล์และโฟลเดอร์ Legacy เดิมทิ้งทันที** ป้องกันไม่ให้เกิด Shadow Files ที่ทำให้เกิดการสับสนหรือ Route ชนกัน
