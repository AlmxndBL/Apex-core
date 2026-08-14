# Observability & Error Tracking

กฎเกณฑ์และมาตรฐานสำหรับการทำ Logging และการติดตามข้อผิดพลาด (Error Tracking) ในระบบ

## 1. Structured Logging
- ใช้ **Pino** เป็น Logger หลัก (แนะนำสำหรับ Node.js / Nitro เนื่องจากประสิทธิภาพสูง)
- การบันทึก Log ต้องอยู่ในรูปแบบ **JSON format** เพื่อง่ายต่อการ parse และวิเคราะห์
- **Log levels:** ใช้ระดับต่อไปนี้
  - `debug`: ข้อมูลสำหรับนักพัฒนา
  - `info`: ข้อมูลการทำงานปกติที่สำคัญ
  - `warn`: เหตุการณ์ที่อาจเป็นปัญหาแต่ระบบยังทำงานได้
  - `error`: ข้อผิดพลาดที่กระทบการทำงานบางส่วน
  - `fatal`: ข้อผิดพลาดร้ายแรงที่ทำให้ระบบทำงานไม่ได้
- **ทุก Log ต้องมี:** `timestamp`, `level`, `message`, `service name`
- **Request logs ต้องมี:** `requestId` (Correlation ID), `method`, `path`, `statusCode`, `duration`

## 2. What to Log / What NOT to Log
**สิ่งที่ควร Log (What to Log):**
- API requests และ responses (แบบสรุป ไม่เอา payload ทั้งหมด)
- Errors พร้อม Stack trace
- Auth events (เช่น login สำเร็จ/ล้มเหลว)
- Business events สำคัญ

**สิ่งที่ห้าม Log เด็ดขาด (What NOT to Log):**
- Passwords
- Tokens, API keys
- ข้อมูล PII (Email, Phone number, National ID)
- Credit card numbers
*(ใช้การ Redaction / Masking ใน Logger เพื่อซ่อนข้อมูลเหล่านี้ก่อนพิมพ์ออกไป)*

## 3. Sentry Integration
ใช้ Sentry สำหรับการทำ Error Tracking:
- **Setup:** กำหนด DSN ผ่าน Environment variable (`SENTRY_DSN`)
- **Release Tracking:** กำหนด version ของโค้ดให้สัมพันธ์กับ Sentry releases
- **Breadcrumbs:** เพิ่ม log เหตุการณ์ต่างๆ นำร่องก่อนเกิด error
- **User Context:** แนบเพียง `id` ของผู้ใช้เท่านั้น ห้ามแนบข้อมูล PII
- **Error Grouping Strategy:** กำหนดการรวมกลุ่มของ error ที่เกิดจากสาเหตุเดียวกัน
- **Source Maps:** ทำการ upload source maps ไปยัง Sentry สำหรับ production เท่านั้น เพื่อให้เห็น stack trace ได้อย่างชัดเจน

## 4. Health Check
ต้องมี Endpoint สำหรับตรวจสอบสถานะของระบบ:
- **Endpoint:** `/api/health`
- **Response Format:** ส่งคืนข้อมูลในรูปแบบ `{ status: 'ok', timestamp, version, uptime }`
- ควรมีการตรวจสอบสถานะการเชื่อมต่อกับ Database (เช่น Prisma `$queryRaw`) และบริการที่จำเป็นอื่นๆ รวมอยู่ใน Health check ด้วย

## 5. Error Classification
แบ่งประเภทของข้อผิดพลาดออกเป็น 2 ประเภทหลัก:
- **Operational Errors:** ข้อผิดพลาดที่คาดการณ์ได้และต้องจัดการอย่างนุ่มนวล (Handle gracefully) เช่น
  - Validation errors
  - Authentication / Authorization failures
  - Not found (404)
  - Timeouts
- **Programmer Errors:** ข้อผิดพลาดที่เกิดจากบั๊กหรือความผิดปกติในโค้ด (Unexpected, Crash) เช่น
  - Null reference
  - Type errors
  - Assertion failures
  *(ข้อสำคัญ: ต้องส่ง Programmer errors ทุกตัวไปยัง Sentry เสมอ)*
