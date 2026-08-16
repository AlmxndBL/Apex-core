---
name: docker-devops-master
description: Production Docker Containerization, Multi-Stage Builds, GitHub Actions CI/CD, and Structured Logging Skill
---

# 🐳 Production Docker & DevOps Automation Skill

> สกิลสำหรับการสร้าง Production Dockerfile แบบ Multi-stage ที่ปลอดภัย ขนาดเล็ก และการตั้งค่า CI/CD Automation ผ่าน GitHub Actions

---

## 🎯 เมื่อไหร่ที่ควรใช้ Skill นี้
- เมื่อต้องการสร้างหรือปรับแต่ง `Dockerfile` และ `docker-compose.yml`
- เมื่อต้องการตั้งค่า Pipeline CI/CD บน GitHub Actions
- เมื่อต้องการปรับแต่ง Container ให้รันด้วย Non-root User และผ่านเกณฑ์ความปลอดภัย

---

## 📦 1. Multi-Stage Dockerfile (Node.js / Nuxt / Next.js)

แยก Stage ระหว่าง Dependencies, Build, และ Production Runner เพื่อให้ได้ Image ขนาดเล็กที่สุดและไม่มีซอร์สโค้ดส่วนเกิน:

```dockerfile
# 1. Base Layer
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# 2. Dependencies Layer
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# 3. Builder Layer
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# รัน Typecheck และ Build
RUN npx prisma generate
RUN npm run build

# 4. Production Runner Layer (Ultra Small & Secure)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# สร้าง Non-root User ป้องกัน Privilege Escalation
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.output ./.output

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", ".output/server/index.mjs"]
```

---

## 🐙 2. GitHub Actions CI/CD Pipeline (`.github/workflows/ci.yml`)

สร้าง Pipeline ตรวจสอบคุณภาพโค้ดอัตโนมัติในทุก Pull Request:

```yaml
name: CI Pipeline

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Type Check
        run: npx vue-tsc --noEmit # หรือ npx tsc --noEmit

      - name: Run Test Suite
        run: npm test -- --run
```
