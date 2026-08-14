# Git & Version Control Conventions

กฎกติกาการใช้งาน Git และ Version Control สำหรับโปรเจกต์นี้

## 1. Conventional Commits
เราใช้มาตรฐาน Conventional Commits ในรูปแบบ `type(scope): description` เพื่อให้ประวัติการ Commit อ่านง่ายและสามารถนำไปสร้าง Changelog อัตโนมัติได้

**รูปแบบ:**
- **Types:**
  - `feat`: เพิ่มฟีเจอร์ใหม่
  - `fix`: แก้ไขบั๊ก
  - `docs`: ปรับปรุงเอกสาร
  - `style`: ปรับฟอร์แมตโค้ด (ไม่มีผลต่อการทำงาน)
  - `refactor`: ปรับปรุงโครงสร้างโค้ด (ไม่มีฟีเจอร์ใหม่ ไม่แก้บั๊ก)
  - `perf`: ปรับปรุงประสิทธิภาพการทำงาน
  - `test`: เพิ่มหรือแก้ไข Test
  - `build`: แก้ไขระบบ Build หรือ Dependencies
  - `ci`: แก้ไขระบบ CI/CD
  - `chore`: งานจิปาถะอื่นๆ
- **Scope:** (ระบุหรือไม่ระบุก็ได้) เป็นส่วนที่อธิบายว่าแก้ไขในส่วนไหนของโปรเจกต์
- **Description:** ใช้ตัวพิมพ์เล็กทั้งหมด ไม่มีจุดท้ายประโยค ความยาวไม่เกิน 72 ตัวอักษร
- **Body:** ใช้อธิบายรายละเอียดเพิ่มเติม (ถ้ามี)

**ตัวอย่าง:**
```
feat(auth): add login with google
```

## 2. Branch Naming
การตั้งชื่อ Branch ให้ใช้รูปแบบ kebab-case เพื่อความสม่ำเสมอ

- `feature/xxx` - สำหรับการพัฒนาฟีเจอร์ใหม่
- `fix/xxx` - สำหรับการแก้ไขบั๊กทั่วไป
- `hotfix/xxx` - สำหรับการแก้ไขบั๊กฉุกเฉินบน production
- `release/xxx` - สำหรับการเตรียม release ใหม่
- `docs/xxx` - สำหรับการแก้ไขเอกสาร

**ข้อสำคัญ:** ต้องแยก (branch) ออกมาจาก `develop` เสมอ (ยกเว้น hotfix ที่แยกจาก `main`)

## 3. Branch Strategy
ใช้รูปแบบ **Git Flow Lite** เพื่อความเรียบง่ายและยืดหยุ่นสำหรับทีมขนาดเล็ก:
- `main` - สำหรับ Production เสมอ
- `develop` - สำหรับการรวบรวมฟีเจอร์ (Integration)
- Feature branches - แยกจาก develop และรวมกลับเข้า develop

**ข้อห้าม:** ห้าม Push โค้ดตรงเข้า `main` หรือ `develop` โดยเด็ดขาด การนำโค้ดเข้าระบบหลักต้องผ่านการทำ Pull Request (PR) เท่านั้น
- **ข้อยกเว้นสำหรับ Solo Developer:** อนุญาตให้ push ตรงเข้า `main` ได้ และใช้ Feature branch เฉพาะเมื่อทำงานขนาดใหญ่

## 4. Pull Request Standards
PR ทุกอันต้องมี Template ที่ชัดเจน ดังนี้:
- **Description:** คำอธิบายว่า PR นี้ทำอะไร
- **Type of change:** ประเภทของการแก้ไข (เช่น Bug fix, New feature)
- **Changes made:** รายการสิ่งที่มีการแก้ไข
- **Testing done:** วิธีการทดสอบที่ได้ทำไปแล้ว
- **Screenshots (if UI):** ภาพหน้าจอในกรณีที่มีการแก้ไข UI
- **Checklist:** รายการตรวจสอบสำหรับการทำ Code Review

## 5. Code Review Checklist
ผู้รีวิว (Reviewer) ต้องตรวจสอบสิ่งต่อไปนี้:
- **Security check:** ไม่มีช่องโหว่ หรือการรั่วไหลของข้อมูลสำคัญ
- **Performance check:** ไม่มีโค้ดที่ทำให้ระบบช้าลง
- **Readability:** โค้ดอ่านเข้าใจง่าย มีการตั้งชื่อตัวแปรและฟังก์ชันที่สื่อความหมาย
- **Test coverage:** มีการเขียน Test ครอบคลุมสิ่งที่แก้ไขหรือสร้างใหม่
- **Breaking changes:** ตรวจสอบว่ามีการเปลี่ยนแปลงที่ส่งผลกระทบต่อส่วนอื่นหรือไม่
- **Documentation updated:** มีการอัปเดตเอกสารที่เกี่ยวข้อง

## 6. PR Size Limits
- ขนาดของ PR ไม่ควรเกิน **~400 lines changed** (ไม่รวม auto-generated files)
- หากการพัฒนามีขนาดใหญ่กว่านี้ ให้แบ่งย่อยเป็น PR เล็กๆ เพื่อให้ง่ายต่อการ Review และลดความเสี่ยง
