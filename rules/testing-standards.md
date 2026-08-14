# Testing Standards

> มาตรฐานและกฎเกณฑ์ในการทำ Automated Testing

## 1. Bounded Loop Requirement
- ตามข้อบังคับหลัก ระบบจะไม่อนุญาตให้ถือว่างานเสร็จสิ้นหากโค้ดยังไม่ผ่าน `Build -> Lint -> Test`
- การเทสต์ ต้องคำนึงถึง Edge cases ไม่ใช่เขียนเพียงเพื่อให้ผ่าน (Happy path)

## 2. Test Types
- **Unit Tests:** ต้องมีสำหรับฟังก์ชันที่เป็น Core Business Logic เสมอ (เช่น การคำนวณราคา, ระบบแปลงค่า)
- **Integration Tests:** หากระบบมีการคุยกับ Database หรือ External API ให้มีการทำ Mocking อย่างเหมาะสม
- **E2E Tests:** ทำต่อเมื่อเจ้าของโปรเจกต์ร้องขอเท่านั้น

## 3. Test Qualities
- เขียนเทสต์ให้อ่านง่าย (Arrange, Act, Assert)
- 1 Test case ควรเทสต์แค่พฤติกรรมเดียว
- อย่าเขียนเทสต์ที่ไปทดสอบ Framework เอง (ทดสอบแค่ Logic ของแอปเรา)

## 4. Coverage Targets
- Minimum coverage สำหรับ Business Logic: 80%+
- Branch coverage สำคัญกว่า Line coverage (เน้นครอบคลุมทุก if/else path)
- ไม่ต้อง 100% coverage — เน้นที่ critical paths: การคำนวณ, auth logic, payment flows
- ใช้ coverage report เป็นเครื่องมือ ไม่ใช่เป้าหมาย (อย่าเขียนเทสต์แค่เพื่อเพิ่ม coverage)

## 5. Tooling Recommendations
- Test Runner: **Vitest** เป็น default (เร็วกว่า Jest, ESM native, TypeScript built-in, Jest-compatible API)
- API Mocking: **MSW (Mock Service Worker)** สำหรับ mock HTTP requests (ทั้ง browser และ Node)
- E2E Testing: **Playwright** เป็น default (cross-browser, auto-wait, faster than Cypress)
- Component Testing: `@nuxt/test-utils` + `mountSuspended` สำหรับ Nuxt components
- ตารางเปรียบเทียบ:
  | Feature | Vitest | Jest |
  |---|---|---|
  | Speed | ⚡ เร็ว (Vite-powered) | 🐢 ช้ากว่า |
  | ESM | ✅ Native | 🟡 ต้อง config |
  | TypeScript | ✅ Built-in | 🟡 ต้อง ts-jest |
  | Watch Mode | ✅ HMR | ✅ แต่ช้ากว่า |

## 6. Snapshot Testing Policy
- ใช้ Snapshot test สำหรับ: UI component rendering, API response structure
- ห้ามใช้ Snapshot test สำหรับ: Business logic, Database queries, Dynamic content (timestamps, IDs)
- อัปเดต snapshot อย่างตั้งใจ — ห้ามใช้ `--update` โดยไม่ review ก่อน

## 7. Test Data Management
- ใช้ Factory pattern สร้าง test data (เช่น `createTestUser()`) แทนการ hardcode
- Test database ต้อง isolated — ใช้ separate DB หรือ transaction rollback
- Cleanup: ลบ test data หลัง test suite จบ (afterAll/afterEach)
- ห้ามให้ test ขึ้นกับ execution order (แต่ละ test ต้อง independent)
- ห้ามใช้ production data สำหรับ testing

## 8. Nuxt-specific Testing
- ใช้ `@nuxt/test-utils` สำหรับ component และ integration tests
- ใช้ `mountSuspended` แทน `mount` สำหรับ async components
- ใช้ `mockNuxtImport` สำหรับ mock auto-imported composables
- Server API routes: test ด้วย `$fetch` ใน integration test หรือ unit test ด้วย `eventHandler`
