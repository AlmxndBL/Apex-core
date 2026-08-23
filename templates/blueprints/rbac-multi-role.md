# 🛡️ RBAC & Multi-Role System Architecture Blueprint

> **System Blueprint:** พิมพ์เขียวมาตรฐานสำหรับการพัฒนาระบบที่มีหลายบทบาท (Role-Based Access Control)
> ออกแบบมาเพื่อป้องกันบั๊ก Hydration Mismatch, Infinite Redirect Loop, และป้องกันข้อมูลหลุดขึ้น Production 100%

---

## 🏗️ 1. โครงสร้างสถาปัตยกรรม (Architectural Overview)

```mermaid
graph TD
    User([ผู้ใช้งาน]) --> Login[หน้า Login]
    Login -- โหมด Dev / Staging --> QuickChips[1-Click Quick Login Chips]
    Login --> AuthAPI[POST /api/v1/auth/login]
    AuthAPI --> Token[ออก JWT HttpOnly Cookie + Role]
    
    Token --> RouterGuard{Client Route Guard}
    RouterGuard -- Role: ADMIN --> AdminSpace[/admin: Admin Workspace]
    RouterGuard -- Role: STAFF --> PosSpace[/pos: POS Workspace]
    RouterGuard -- Role: KITCHEN --> KdsSpace[/kds: Kitchen Workspace]
    RouterGuard -- ไม่มีสิทธิ์เข้าถึง --> Forbidden[/403: Forbidden Page]

    AdminSpace --> ServerGuard{Server API RBAC Middleware}
    ServerGuard -- Role ถูกต้อง --> DB[(Database)]
    ServerGuard -- Role ไม่ถูกต้อง --> Return403[403 Forbidden]
```

---

## 🗄️ 2. Safe Database Seeding Dispatcher

ป้องกันปัญหา `npx prisma db seed` พัง และป้องกันข้อมูลทดสอบหลุดเข้า Production ด้วยการแยกไฟล์ชัดเจน:

```text
prisma/
├── seed.ts             # 🌟 Main Entrypoint ที่ Prisma เรียกใช้
└── seeds/
    ├── dev.seed.ts     # บัญชีผู้ใช้ทดสอบรหัสผ่านง่ายครบทุก Role
    └── prod.seed.ts    # เฉพาะ System Roles, Permissions, Default Settings
```

### ตัวอย่าง `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client'
import { seedProd } from './seeds/prod.seed'
import { seedDev } from './seeds/dev.seed'

const prisma = new PrismaClient()

async function main() {
  const isProduction = process.env.APP_ENV === 'production' || process.env.NODE_ENV === 'production'

  console.log(`🌱 Seeding database (Production: ${isProduction})`)
  
  // 1. รัน Master Seed เสมอ (Roles, Permissions)
  await seedProd(prisma)

  // 2. รัน Dev Seed เฉพาะเมื่อไม่ใช่ Production
  if (!isProduction) {
    await seedDev(prisma)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
```

---

## ⚡ 3. Hydration-Safe 1-Click Persona Quick-Login

> ⚠️ **Permission Gate (กฎเหล็ก):** AI **ต้องถามผู้ใช้ก่อนเสมอ** ว่าต้องการให้สร้างปุ่ม/คอมโพเนนต์ 1-Click Quick Login (Dev/QA Helper) ไหม ห้ามสร้างเองโดยไม่ได้รับอนุญาต

เพื่อป้องกันบั๊ก **SSR Hydration Mismatch**, **Staging QA ใช้งานไม่ได้** และรองรับทั้ง **บัญชีทดสอบเดิม (Existing Accounts)** หรือ Mock Personas:

### ฝั่ง Nuxt 4 (Vue):
```vue
<!-- components/auth/DevQuickLogin.vue -->
<template>
  <ClientOnly>
    <div v-if="isDevLoginEnabled" class="p-4 bg-muted/50 rounded-lg border border-dashed my-4">
      <p class="text-xs font-semibold text-muted-foreground mb-2">⚡ 1-Click Demo Personas (Dev/QA Only)</p>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="persona in devPersonas"
          :key="persona.email"
          size="xs"
          :color="persona.color"
          variant="soft"
          @click="quickLogin(persona.email)"
        >
          {{ persona.label }}
        </UButton>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
// เปิดใช้งานใน local dev หรือเมื่อมี flag ENABLE_DEV_LOGIN บน Staging
const isDevLoginEnabled = import.meta.env.DEV || config.public.enableDevLogin === 'true'

// ดึงรายชื่อบัญชีทดสอบจาก Config หรือใช้อัญเชิญค่าเริ่มต้น
const devPersonas = [
  { label: '👑 Admin', email: config.public.testAdminEmail || 'admin@test.com', color: 'primary' as const },
  { label: '📊 Manager', email: config.public.testManagerEmail || 'manager@test.com', color: 'emerald' as const },
  { label: '🛒 Staff', email: config.public.testStaffEmail || 'staff@test.com', color: 'amber' as const }
]

const quickLogin = async (email: string) => {
  // ทำการล็อกอินด้วยบัญชีทดสอบ
}
</script>
```

---

## 🛡️ 4. Dual-Layer Route Guards & Anti-Redirect Loop

### กฎสำคัญ:
1. **ป้องกัน Redirect Loop:** หากผู้ใช้พยายามเข้าหน้าที่ไม่มีสิทธิ์ ให้ Redirect ไปยังหน้า `/403` หรือ Home Route ประจำ Role ของตนเอง **ห้าม Redirect วนกลับไปกลับมาระหว่างหน้า Login**
2. **Server Middleware Enforcement:** ฝั่ง Server ต้องเช็ก Role ซ้ำทุกครั้งก่อนคืนข้อมูล

### ตัวอย่าง Client Route Guard (Nuxt 4 / Vue Middleware):
```typescript
// middleware/rbac.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // 1. อนุญาตให้เข้าหน้า Public และหน้า Login เสมอ
  if (to.path === '/login' || to.path === '/403' || to.meta.public) return

  // 2. ถ้ายังไม่ล็อกอิน ให้ไป Login
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }

  // 3. ตรวจสอบสิทธิ์ตาม Prefix ของ Workspace
  const requiredRole = to.meta.requiredRole as string
  if (requiredRole && auth.user?.role !== requiredRole) {
    return navigateTo('/403') // ส่งไปหน้า 403 เพื่อป้องกัน Loop
  }
})
```

### ตัวอย่าง Server RBAC Hard Gate (Nitro Server Middleware):
```typescript
// server/middleware/02.rbac.ts
export default defineEventHandler(async (event) => {
  const path = getRequestPath(event)

  if (path.startsWith('/api/v1/admin')) {
    const user = event.context.auth?.user
    if (!user || user.role !== 'ADMIN') {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access required' })
    }
  }
})
```

---

## 🖥️ 5. Role-Based Workspace Separation

จัดแยกโฟลเดอร์ตาม Domain หน้าที่อย่างชัดเจน:
- `layouts/admin.vue` $\rightarrow$ App Shell สำหรับผู้บริหาร (มีเมนู Analytics, Users, Settings)
- `layouts/pos.vue` $\rightarrow$ App Shell สำหรับหน้าร้าน (เน้น Touch Screen, Cart, Checkout)
- `layouts/kds.vue` $\rightarrow$ App Shell สำหรับในครัว (เน้น Order Queue, Fullscreen)

### 🏷️ Header Role Badge:
บน Header ของทุก App Shell ให้ใส่ Badge ระบุสถานะเสมอ:
```vue
<div class="flex items-center gap-3">
  <UBadge :color="roleColor" variant="subtle">{{ user?.role }}</UBadge>
  <span class="text-sm font-medium">{{ user?.name }}</span>
  <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-arrow-right-on-rectangle" @click="logout" />
</div>
```

---

## ⚡ 6. Concurrency-Safe Token Refresh & Dual Auth (Anti-Race Condition)

ป้องกันปัญหาผู้ใช้ถูกเตะออกจากระบบเมื่อเปิดหลายแท็บ หรือมี API ยิงขนานพร้อมกันจังหวะ Access Token หมดอายุ:

### 1. Client-Side Request Mutex Interceptor (`composables/useApi.ts`):
```typescript
let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

export const useApi = () => {
  const auth = useAuthStore()

  const apiFetch = $fetch.create({
    retry: 1,
    retryStatusCodes: [401],
    async onResponseError({ response, options }) {
      if (response.status === 401 && !options.url.toString().includes('/api/v1/auth/refresh')) {
        // หากมี Request อื่นกำลัง Refresh อยู่ ให้รอ Promise เดียวกัน (Mutex Queue)
        if (!isRefreshing) {
          isRefreshing = true
          refreshPromise = auth.refreshToken().finally(() => {
            isRefreshing = false
            refreshPromise = null
          })
        }

        const success = await refreshPromise
        if (!success) {
          auth.logout()
        }
      }
    }
  })

  return { apiFetch }
}
```

### 2. Server Dual Auth & Grace Period Handler (`server/middleware/01.auth.ts`):
```typescript
import { H3Event, getCookie, getRequestHeader, createError } from 'h3'
import { verifyJwt } from '~/server/utils/jwt'

export default defineEventHandler(async (event: H3Event) => {
  const path = getRequestPath(event)
  if (path.startsWith('/api/v1/public') || path.startsWith('/api/v1/auth/login')) {
    return
  }

  // 1. Dual Auth Extraction: ตรวจ HttpOnly Cookie ก่อน แล้ว Fallback ไป Bearer Header
  const cookieToken = getCookie(event, 'access_token')
  const authHeader = getRequestHeader(event, 'authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
  const token = cookieToken || bearerToken

  if (!token) return

  try {
    const payload = verifyJwt(token)
    event.context.auth = { user: payload }
  } catch {
    // ปล่อยให้ handler หรือ RBAC middleware ตรวจสอบ status ต่อไป
  }
})
```
