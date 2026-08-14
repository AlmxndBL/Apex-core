# Performance Standards & Optimization

มาตรฐานประสิทธิภาพและแนวทางการเพิ่มประสิทธิภาพให้กับแอปพลิเคชัน (ทั้ง Frontend และ Backend)

## 1. Web Vitals Targets
เว็บไซต์ต้องทำความเร็วให้ผ่านเกณฑ์ Core Web Vitals ดังนี้:
- **LCP (Largest Contentful Paint):** < 2.5 วินาที
- **INP (Interaction to Next Paint):** < 200 มิลลิวินาที
- **CLS (Cumulative Layout Shift):** < 0.1
- ใช้ **Lighthouse CI** ในขั้นตอนของ CI/CD เพื่อตรวจสอบแบบอัตโนมัติ

## 2. API Response Time
เป้าหมายเวลาในการตอบสนองของ API:
- **P95 < 200ms** สำหรับ Queries ธรรมดา (เช่น การดึงข้อมูลเบื้องต้น)
- **P95 < 500ms** สำหรับ Complex operations (การทำงานที่ซับซ้อน หรือต้องต่อกับ 3rd-party)
- **P95 < 1000ms** สำหรับ Reports / Aggregations (การคำนวณและรายงานผล)
- **Timeout:** กำหนด Timeout สูงสุดที่ **30 วินาที** สำหรับทุก API Requests

## 3. Bundle Size Budget
- **Initial JS:** ขนาดไม่ควรเกิน **200KB** (gzipped) เพื่อการโหลดหน้าแรกที่รวดเร็ว
- ใช้เทคนิค **Lazy load routes** เพื่อโหลดเฉพาะสิ่งที่จำเป็น
- หมั่นตรวจสอบและ Audit Bundle size โดยใช้คำสั่ง `nuxt analyze`

## 4. Frontend Optimization
- **Code splitting:** ปล่อยให้ระบบจัดการอัตโนมัติ (Auto via Nuxt)
- **Image optimization:** ใช้ component `<NuxtImage>` และฟอร์แมตสมัยใหม่เช่น WebP หรือ AVIF
- **Font optimization:**
  - โหลดเฉพาะชุดอักษร (Subset) ที่ใช้
  - กำหนด `font-display: swap` เสมอ
- **Virtual scrolling:** ใช้เทคนิค Virtual scrolling เมื่อต้องแสดงผลรายการ (Lists) ที่มีข้อมูลมากกว่า 100 รายการ

## 5. Backend Optimization
- **N+1 query detection:** หลีกเลี่ยงปัญหา N+1 โดยใช้ฟีเจอร์ `include` ของ Prisma แทนการ Query แยกกันใน Loop
- **Query Optimization:** ใช้คำสั่ง `EXPLAIN ANALYZE` ใน PostgreSQL สำหรับวิเคราะห์และปรับปรุง Query ที่ทำงานช้า
- **Database Indexing:** วางกลยุทธ์การทำ Indexing ให้เหมาะสมกับฟิลด์ที่มีการค้นหาบ่อยๆ

## 6. Caching Strategy
กำหนดกลยุทธ์การแคชระดับต่างๆ:
- **CDN Caching:** สำหรับ Static assets (เช่น รูปภาพ, ไฟล์ JS/CSS) ควรกำหนดให้เป็น immutable และมีอายุ `max-age=1year`
- **API Response Caching:** ใช้เทคนิค Stale-while-revalidate สำหรับข้อมูลที่มีการเปลี่ยนแปลงบ่อยแต่ไม่ต้องการความเรียลไทม์ขั้นสุด
- **Server-side Caching:** ใช้ `defineCachedEventHandler` ของ Nuxt (Nitro) เพื่อจำกัดภาระของเซิร์ฟเวอร์
- **Redis:** ใช้งานเมื่อจำเป็น เช่น การจัดการ Sessions หรือแคชผลลัพธ์ของ Queries ที่ถูกเรียกซ้ำถี่ๆ ในระบบที่มีสเกลใหญ่ขึ้น
