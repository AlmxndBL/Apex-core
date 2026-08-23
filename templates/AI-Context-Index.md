# 🗺️ AI Context Index & Project Architecture Map

> **Agent Guidance:** Single source of truth architectural map for AI coding agents to onboard instantly without scanning the entire workspace.
> ⚠️ **Security Notice:** Never store raw connection strings, API keys, or credentials in this file. Use environment variables or `<secret:VAR_NAME>` placeholders.

---

## 📌 1. Project Overview
- **Project Name:** [Specify Project Name]
- **Description:** [Specify Core Problem, Target Audience, and Goals]
- **Core Tech Stack:** [e.g. Nuxt 4 + Nitro + Prisma ORM + PostgreSQL / Next.js 15 + React 19 + Tailwind CSS]
- **Environment Status:** Development / Staging / Production

---

## 📁 2. Directory Blueprint

### [Select Preset Matching Your Project]

#### 🟢 Preset A: Nuxt 4 (Vue Full-Stack)
```text
.
├── AGENTS.md                  # Master Agent Rules
├── AI-Context-Index.md        # AI Context Index & System Architecture Map (This file)
├── rules/                     # 6 Domain Engineering Standards
├── app/ (or root)
│   ├── layouts/               # App Shell Layouts (default.vue, admin.vue)
│   ├── pages/                 # File-based Routes & Views
│   ├── features/              # Feature Domain Components & Logic
│   ├── components/ui/         # Shared Atomic UI Components (Nuxt UI)
│   └── composables/           # Shared Custom Hooks / Composables
├── server/                    # Nitro Backend Server Engine
│   ├── api/v1/                # Server REST API Endpoints
│   ├── middleware/            # Auth, CORS & Logging Middleware
│   └── utils/                 # Prisma Client & Server Utilities
├── prisma/                    # Database Schema & Migrations
└── public/                    # Static Assets (Images, Icons)
```

#### 🔵 Preset B: React (Next.js / Vite SPA)
```text
.
├── AGENTS.md                  # Master Agent Rules
├── AI-Context-Index.md        # AI Context Index & System Architecture Map (This file)
├── rules/                     # 6 Domain Engineering Standards
├── src/                       # React Application Source
│   ├── layouts/               # App Shell Layouts (RootLayout.tsx, AdminLayout.tsx)
│   ├── pages/                 # Page View Components per Route
│   ├── features/              # Feature Domain Modules (components, hooks, types)
│   ├── components/ui/         # Shared Atomic Components (Shadcn UI / Radix)
│   ├── store/                 # Global Client State Stores (Zustand)
│   └── routes/                # Router Configuration & Outlets
├── prisma/                    # Database Schema & Migrations
└── public/                    # Static Assets
```

---

## 🗄️ 3. Core Domain Models
- **User / Account:** [e.g. RBAC Roles, Auth Sessions, Profiles]
- **[Domain Model 2]:** [Brief description of schema relation]
- **[Domain Model 3]:** [Brief description of schema relation]

---

## 🔌 4. Key API Endpoints Map
- `GET    /api/v1/health` $\rightarrow$ System Health Check
- `POST   /api/v1/auth/login` $\rightarrow$ User Authentication
- `GET    /api/v1/[resource]` $\rightarrow$ Resource List (Paginated)
- `POST   /api/v1/[resource]` $\rightarrow$ Create Resource
- `PUT    /api/v1/[resource]/:id` $\rightarrow$ Update Resource
- `DELETE /api/v1/[resource]/:id` $\rightarrow$ Soft Delete Resource

---

## 🚨 5. Project-Specific Red Lines
1. Never modify database schemas without versioned migrations.
2. Never import components or services across feature domains directly without a shared interface.
3. All sensitive credentials must use environment variables (`.env`).
