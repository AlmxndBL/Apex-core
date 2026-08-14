# System Design & Architecture (9arm Style)

> กฎสำหรับการออกแบบระบบ สไตล์ Pragmatic Software Engineer (อ้างอิง mindset แบบพี่นายอาร์ม)

## 🧠 Core Philosophy
1. **Don't Over-engineer:** เลือกสิ่งที่แก้ปัญหาได้ตรงจุดที่สุด อย่าใช้ Tech ยิ่งใหญ่เกินความจำเป็นของโปรเจกต์
2. **Trade-off Analysis:** ทุกการเลือกมีข้อดีข้อเสีย ต้องอธิบายเหตุผลเปรียบเทียบได้ว่าทำไมถึงเลือกใช้ Stack นี้
3. **Operations Mindset:** คิดถึงตอน Deploy และ Maintain ด้วย ไม่ใช่แค่ตอนเขียนโค้ด
4. **Don't Reinvent the Wheel:** ถ้ามี Library/Framework หรือ Service ที่เสถียรและตอบโจทย์ ให้ใช้เลย ไม่ต้องเขียนเองใหม่หมดจากศูนย์

## 🛠️ Architecture Planning Step
เมื่อเริ่มต้นโปรเจกต์หรือฟีเจอร์ใหญ่ ให้คิดและนำเสนอสิ่งเหล่านี้:
- Tech Stack ที่เหมาะสม (อธิบายเหตุผลสั้นๆ)
- Data Flow หรือ Life Cycle ของฟีเจอร์นั้น
- การขยายตัวในอนาคต (Scalability แบบเบื้องต้น)

## 📊 Diagram Rules
- **ห้าม**สร้าง Architecture Diagram (เช่น Mermaid) ออกมาเองโดยพลการ
- **ต้องถามเจ้าของโปรเจกต์เสมอ** ว่า: *"ต้องการให้ผมวาด Architecture Diagram เพื่อดูภาพรวมก่อนเริ่มเขียนโค้ดไหมครับ?"*
- ถ้ายืนยันว่าให้วาด ค่อยเขียน Mermaid Diagram ออกมาให้ดูเข้าใจง่ายที่สุด

## 🏗️ Architecture Patterns Guidance
- ตารางเปรียบเทียบ:
  | สถานการณ์ | Pattern ที่แนะนำ | เหตุผล |
  |---|---|---|
  | CRUD app ทั่วไป | Monolith + MVC/Repository | Simple, เร็ว, เหมาะกับทีมเล็ก |
  | SaaS / Multi-module | Modular Monolith | แยก module ชัด, deploy ง่าย, scale ทีหลังได้ |
  | Event-driven system | Event Sourcing + CQRS | Audit trail, complex workflows |
  | High traffic API | Microservices | เมื่อ monolith เป็นคอขวดจริงๆ เท่านั้น |
- Default สำหรับโปรเจกต์ใหม่: **Monolith + Layered Architecture** (Nuxt full-stack)
- อย่าเริ่มด้วย Microservices ถ้าไม่มีเหตุผลชัดเจน

## 📦 Dependency Management
- ก่อนเพิ่ม dependency ใหม่ ต้องประเมิน:
  - Maintenance status: last commit < 6 เดือน, active issues/PRs
  - Bundle size: ตรวจด้วย bundlephobia.com
  - License: ต้องเป็น MIT, Apache 2.0, หรือ BSD (ห้าม GPL ใน commercial projects)
  - Alternatives: มี built-in solution หรือ lighter alternative ไหม?
- ล็อก version ด้วย lock file เสมอ (`pnpm-lock.yaml`)
- รัน `pnpm audit` ก่อนทุก release
- อัปเดต dependencies อย่างน้อยเดือนละครั้ง (security patches)

## 🌍 Environment Strategy
- 3 environments:
  - **Development**: local Docker Compose, seed data, debug logging
  - **Staging**: mirror production, test data, accessible to team only
  - **Production**: real data, error tracking (Sentry), performance monitoring
- Feature Flags: ใช้สำหรับ features ที่ยังไม่พร้อม release (เช่น environment variable `FEATURE_NEW_CHECKOUT=true`)
- ห้าม test ใน production เด็ดขาด

## ⚡ Nuxt-specific Architecture
- ใช้ Nuxt Layers สำหรับ shared code across projects
- Nuxt Modules: ใช้ official modules เป็น priority (เช่น `@nuxt/image`, `@nuxt/fonts`, `nuxt-security`)
- Server vs Client: ใช้ `server/` สำหรับ business logic, `composables/` สำหรับ client state, `utils/` สำหรับ shared utilities
- Auto-imports: ใช้ Nuxt auto-imports แต่ explicit import สำหรับ third-party libraries
