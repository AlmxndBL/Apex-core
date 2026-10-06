# 🩺 Blueprint: Dual-Probe Production Healthcheck Endpoints

> **Apex v6.0 Blueprint · Domain: Observability & Container Lifecycle**  
> Covers Kubernetes / Docker Swarm / Cloudflare / Coolify dual health probes: Liveness (`/api/health/live`) and Readiness (`/api/health/ready`).

---

## 🎯 Purpose & Threat Model

Single `/health` endpoints that query databases on every request create cascading outages when traffic surges.
Apex v6.0 standardizes on **Dual Probes**:
1. **Liveness Probe (`GET /api/health/live`):** Is the process event loop running? (Fast in-memory check, zero external I/O).
2. **Readiness Probe (`GET /api/health/ready`):** Are downstream connections (PostgreSQL connection pool, Redis) healthy and ready to receive user traffic?

---

## 💻 Implementation (Nuxt 4 / Nitro)

### 1. Liveness Endpoint (`server/api/health/live.get.ts`)
```typescript
export default defineEventHandler((event) => {
  setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate');
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});
```

### 2. Readiness Endpoint (`server/api/health/ready.get.ts`)
```typescript
import prisma from '~/server/utils/prisma';
import redis from '~/server/utils/redis';

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate');

  const checks = {
    database: false,
    redis: false,
  };

  try {
    // 1. Check Database connection pool
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;

    // 2. Check Redis connection
    if (redis) {
      await redis.ping();
      checks.redis = true;
    } else {
      checks.redis = true; // Redis optional or skipped
    }

    return {
      status: 'ready',
      checks,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    throw createError({
      statusCode: 503,
      statusMessage: 'SERVICE_UNAVAILABLE: Downstream connection check failed.',
      data: {
        checks,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
});
```

---

## 💻 Implementation (Next.js 15 App Router)

### 1. Liveness Route (`app/api/health/live/route.ts`)
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }, { status: 200 });
}
```

### 2. Readiness Route (`app/api/health/ready/route.ts`)
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: 'ready',
      database: true,
      timestamp: new Date().toISOString(),
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 'unready',
      database: false,
      timestamp: new Date().toISOString(),
    }, { status: 503 });
  }
}
```

---

## ⚙️ Docker Compose & Orchestrator Wiring

```yaml
services:
  web:
    image: my-app:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health/live"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 15s
```
