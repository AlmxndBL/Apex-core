# Documentation Standards

มาตรฐานการเขียนเอกสารอ้างอิงและการทำ Comments ภายในโปรเจกต์

## 1. README Template
ทุกโปรเจกต์ในระบบต้องมีไฟล์ `README.md` เป็นหน้าบ้าน โดยต้องมีหัวข้อต่อไปนี้อย่างน้อย:
- **Project description:** คำอธิบายสั้นๆ ว่าโปรเจกต์นี้คืออะไร ทำงานอย่างไร
- **Tech stack:** เทคโนโลยีที่ใช้
- **Prerequisites:** สิ่งที่จำเป็นต้องมีก่อนติดตั้ง (เช่น Node.js version, Docker)
- **Setup instructions:** ขั้นตอนการติดตั้งแบบ Step-by-step
- **Development workflow:** วิธีการรันบนเครื่อง แนะนำสคริปต์ต่างๆ (เช่น `npm run dev`)
- **Deployment instructions:** วิธีการ Deploy ขึ้น Server
- **Environment variables table:** ตารางแสดงตัวแปร Env ทั้งหมด รวมถึงคำอธิบาย
- **Contributing guidelines:** กติกาสำหรับผู้ที่จะเข้ามามีส่วนร่วมในโปรเจกต์

## 2. API Documentation
- สร้างเอกสาร API แบบ Auto-generate จากโค้ดให้มากที่สุด
- ใช้มาตรฐาน **OpenAPI / Swagger** สำหรับ REST APIs
- เอกสารของแต่ละ Endpoint ต้องระบุ: Endpoint path, Method (GET, POST ฯลฯ), Request / Response examples, Error codes
- ต้องรักษาเอกสาร API ให้ทันสมัยตรงกับโค้ดจริง (Keep docs in sync with code) เสมอ

## 3. Architecture Decision Records (ADR)
เมื่อมีการตัดสินใจเชิงเทคนิคที่มีความสำคัญ (เช่น เปลี่ยน Database, นำ Tool ใหม่มาใช้) ให้บันทึกด้วยรูปแบบ ADR Template:
- **Title:** หัวข้อเรื่อง
- **Date:** วันที่ตัดสินใจ
- **Status:** สถานะปัจจุบัน (Proposed, Accepted, Deprecated)
- **Context:** บริบทและสาเหตุของปัญหา
- **Decision:** สิ่งที่ตัดสินใจเลือก
- **Consequences:** ผลลัพธ์หรือข้อพิจารณาที่ตามมาจากการตัดสินใจนี้
- บันทึกไฟล์ทั้งหมดไว้ในโฟลเดอร์ `docs/adr/`

## 4. Changelog
- ติดตามการอัปเดตของโปรเจกต์ตามรูปแบบ **Keep a Changelog**
- ใช้หมวดหมู่ดังนี้: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`
- ผู้พัฒนาต้องอัปเดตไฟล์ Changelog เสมอเมื่อมี Pull Request ใหม่ถูกอนุมัติ

## 5. Code Comments
- กฎทอง: **"Comment WHY, not WHAT"** จงคอมเมนต์อธิบาย "เหตุผล" หรือ "ทำไมต้องเขียนแบบนี้" แทนที่จะอธิบายว่าโค้ดบรรทัดนี้ทำอะไร (เพราะโค้ดควรจะบอก WHAT ด้วยตัวมันเองอยู่แล้ว)
- ใช้ **JSDoc / TSDoc** สำหรับอธิบาย Public functions, Interfaces หรือ Types ที่มีการเรียกใช้งานจากหลายที่
- ห้ามทิ้งโค้ดที่ถูกคอมเมนต์ไว้ (Commented-out code) ให้ลบทิ้งไปเลย (สามารถดูประวัติจาก Git ได้)
- หลีกเลี่ยงการเขียนคอมเมนต์ในเรื่องที่ชัดเจนหรือรู้อยู่แล้ว (Obvious comments)
