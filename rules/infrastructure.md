# Infrastructure & Deployment

มาตรฐานการตั้งค่าโครงสร้างพื้นฐาน การจัดการ Environment และการทำ Deployment

## 1. Docker Standards
- **Multi-stage builds:** ใช้ Multi-stage ใน Dockerfile เสมอ (แยก Build stage ออกจาก Production stage)
- **.dockerignore:** ต้องมีไฟล์นี้เสมอเพื่อลดขนาด Build context
- **Security:** รัน Container ในฐานะ Non-root user
- **Health check:** กำหนด `HEALTHCHECK` ใน Dockerfile
- **Base image:** ให้ Pin version ของ Base image ให้ชัดเจน (เช่น `node:20-alpine` แทนที่จะใช้ `node:latest`)

## 2. Docker Compose
- ใช้สำหรับการพัฒนาในเครื่อง (Development setup) โดยรันร่วมกันทั้ง App, PostgreSQL และ Redis (ถ้ามี)
- **Volume mounts:** ทำการ mount ไฟล์เพื่อรองรับ Hot reload
- **Network isolation:** แยก Network ระหว่าง Service อย่างชัดเจน
- **Environment variables:** โหลดตัวแปรต่างๆ จากไฟล์ `.env`

## 3. VPS Deployment
- **Reverse Proxy:** ใช้ Nginx ทำหน้าที่เป็น Reverse Proxy รับ traffic เข้ามา
- **SSL Certificates:** ใช้ Let's Encrypt (Certbot) ในการทำ HTTPS อัตโนมัติ
- **Process management:** ใช้ PM2 หรือ Docker restart policy เพื่อให้แอปพลิเคชันทำงานได้อย่างต่อเนื่อง
- **Zero-downtime deployment:** วางแผนการ Deploy แบบไม่ให้ระบบล่ม (เช่น การใช้ Blue/Green deployment เล็กๆ หรือการโหลด Container ใหม่มาแทนที่)

## 4. Environment Management
- จัดเตรียมระบบออกเป็น 3 Environments: `development`, `staging`, `production`
- แยกไฟล์การตั้งค่าออกเป็น: `.env.development`, `.env.staging`, `.env.production`
- **Naming convention:**
  - Nuxt: Client = `NUXT_PUBLIC_*` / Server-only = `NUXT_*`
  - Next.js: Client = `NEXT_PUBLIC_*` / Server-only = ไม่มี prefix
  - Vite: Client = `VITE_*` / Server-only = ไม่มี prefix

## 5. CI/CD Pipeline
- ใช้ **GitHub Actions** สำหรับทำ Workflow: Build → Lint → Test → Build Docker → Deploy
- **Staging:** ตั้งค่าให้ทำ Auto-deploy ไปยัง Staging server เมื่อมีการ push โค้ดเข้า branch `develop`
- **Production:** ทำ Manual deploy ไปยัง Production server เมื่อมีการ push โค้ดเข้า branch `main`
- กำหนดให้การ Merge เข้า `main` หรือ `develop` ต้องผ่านการทำ PR review ก่อนเสมอ

## 6. Backup Strategy
กลยุทธ์การสำรองข้อมูลสำหรับ PostgreSQL:
- ทำ Automated backup เป็นประจำทุกวัน โดยใช้คำสั่ง `pg_dump`
- จัดเก็บไฟล์ Backup ไว้ใน Volume ที่แยกต่างหาก หรืออัปโหลดไปยัง Amazon S3
- **Retention policy (ระยะเวลาการเก็บ):**
  - รายวัน: 7 วันล่าสุด
  - รายสัปดาห์: 4 สัปดาห์ล่าสุด
  - รายเดือน: 3 เดือนล่าสุด
- **Test restore:** ต้องมีการซ้อมกู้คืนข้อมูล (Test restore) อย่างน้อยทุกๆ ไตรมาส (Quarterly)

## 7. Environment Variable Validation
- ต้อง Validate ทุก Environment Variable ตอน App เริ่มรัน (Fail Fast)
- ใช้ Zod หรือ `@t3-oss/env-core` สร้าง Schema สำหรับ ENV ทั้งหมด
- หาก ENV ที่จำเป็นขาดหายไป แอปต้องหยุดทำงานทันทีพร้อมแจ้ง Error ชัดเจนว่าขาดตัวแปรอะไร
