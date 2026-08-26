#!/usr/bin/env node

/**
 * Golden-file tests for benchmark/lib/ast-extractor.js
 * Locks the heuristic extraction behavior (TS / Vue SFC / Prisma) so future
 * refactors — including a compiler-grade rewrite via ts-morph — cannot silently
 * change what the benchmark measures. Exit code 1 on any failure.
 */

import { extractAstSkeleton } from '../benchmark/lib/ast-extractor.js';

let passed = 0;
let failed = 0;
const failures = [];

function check(condition, message) {
  if (condition) {
    passed++;
    console.log(`  \x1b[32m✔\x1b[0m ${message}`);
  } else {
    failed++;
    failures.push(message);
    console.log(`  \x1b[31m✖\x1b[0m ${message}`);
  }
}

console.log('\n\x1b[1m\x1b[36m🧪 [Apex AST-Extractor Unit Tests] Locking extraction behavior...\x1b[0m\n');

// ── 1. TypeScript contracts ──────────────────────────────────────────────────
console.log('\x1b[1m1. TypeScript Extraction\x1b[0m');
const TS_SOURCE = `import { PrismaClient } from '@prisma/client';

export interface UserTableRow {
  id: string;
  email: string;
  role: Role;
}

export type Role = 'ADMIN' | 'MEMBER' | 'AUDITOR';
type InternalFlags = { debug: boolean };

export async function listUsers(db: PrismaClient, orgId: string): Promise<UserTableRow[]> {
  const rows = await db.user.findMany({ where: { organizationId: orgId } });
  return rows.map(toRow);
}

export default function toRow(row: any): UserTableRow {
  return { id: row.id, email: row.email, role: row.role };
}

export class UserService {
  constructor(private db: PrismaClient) {}
  async find(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }
}

export const useUserCache = (ttlMs: number) => {
  let cache = new Map();
  return { get: (k: string) => cache.get(k), ttlMs };
};
`;
{
  const out = extractAstSkeleton('users.ts', TS_SOURCE);
  check(out.includes('export interface UserTableRow {'), 'multiline interface header kept');
  check(out.includes('role: Role;'), 'interface body kept');
  check(out.includes("export type Role = 'ADMIN' | 'MEMBER' | 'AUDITOR';"), 'one-line exported type alias kept');
  check(out.includes('InternalFlags'), 'internal type alias also captured (part of contract surface)');
  check(out.includes('export async function listUsers(db: PrismaClient, orgId: string): Promise<UserTableRow[]>;'), 'async function signature kept');
  check(!out.includes('findMany'), 'function body pruned');
  check(out.includes('export default function toRow(row: any): UserTableRow;'), 'default-exported function signature kept');
  check(/class UserService/.test(out), 'class declaration signature kept');
  check(!out.includes('constructor'), 'class body pruned');
  check(out.includes('export const useUserCache = (ttlMs: number) =>'), 'arrow-const signature line kept');
  check(!out.includes('new Map'), 'arrow body pruned');
}
{
  // Single-line brace declaration must NOT swallow the next declaration
  const tricky = `export interface Point { x: number; y: number }
export function magnitude(p: Point): number {
  return Math.hypot(p.x, p.y);
}`;
  const out = extractAstSkeleton('point.ts', tricky);
  check(out.includes('export interface Point { x: number; y: number }'), 'single-line interface captured whole');
  check(out.includes('export function magnitude(p: Point): number;'), 'following function NOT swallowed by single-line interface');
}

// ── 2. Vue SFC ───────────────────────────────────────────────────────────────
console.log('\n\x1b[1m2. Vue SFC Extraction\x1b[0m');
const VUE_SETUP = `<template>
  <div class="min-h-screen"><table class="w-full"><tr><td>{{ row.email }}</td></tr></table></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props { users: UserTableRow[] }
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'select', id: string): void }>();

const selectedId = ref<string | null>(null);
function pick(id: string) {
  selectedId.value = id;
  emit('select', id);
}
</script>
`;
{
  const out = extractAstSkeleton('UserList.vue', VUE_SETUP);
  check(!out.includes('<div'), 'template markup pruned');
  check(out.includes('interface Props { users: UserTableRow[] }') || out.includes('interface Props {'), 'Props interface kept');
  check(out.includes('const props = defineProps<Props>();'), 'defineProps signature kept');
  check(out.includes('defineEmits'), 'defineEmits signature kept');
  check(!out.includes('selectedId.value'), 'script body pruned');
}
{
  // Fallback: plain <script lang="ts"> without setup
  const VUE_PLAIN = `<template><span>{{ label }}</span></template>
<script lang="ts">
export function formatLabel(label: string): string {
  return label.trim().toUpperCase();
}
</script>`;
  const out = extractAstSkeleton('Label.vue', VUE_PLAIN);
  check(out.includes('export function formatLabel(label: string): string;'), 'plain <script lang="ts"> fallback works');
  check(!out.includes('<span>'), 'template pruned in fallback path');
}

// ── 3. Prisma schema ─────────────────────────────────────────────────────────
console.log('\n\x1b[1m3. Prisma Schema Extraction\x1b[0m');
const PRISMA_SOURCE = `generator client {
  provider = "prisma-client-js"
}

model AuditLog {
  id             String   @id @default(cuid())
  action         String
  actorEmail     String?
  organizationId String
  createdAt      DateTime @default(now())

  @@index([organizationId, createdAt])
  @@map("audit_logs")
}
`;
{
  const out = extractAstSkeleton('schema.prisma', PRISMA_SOURCE);
  check(out.includes('model AuditLog {'), 'model header kept');
  check(out.includes('id String @id'), 'field with @id flag kept');
  check(out.includes('actorEmail String?'), 'nullable field kept');
  check(!out.includes('@@index'), '@@index blocks pruned');
  check(!out.includes('prisma-client-js'), 'generator block pruned');
  check(!out.includes('@@map'), '@@map attributes pruned');
}
check(extractAstSkeleton('x.ts', '') === '', 'empty input returns empty string');

// ── Summary ──────────────────────────────────────────────────────────────────
console.log('\n------------------------------------------------------------');
console.log(`\x1b[1mResults: ${passed}/${passed + failed} checks passed.\x1b[0m`);
if (failed === 0) {
  console.log('\x1b[32m✔ Extractor behavior locked. (100%)\x1b[0m\n');
  process.exit(0);
} else {
  console.log(`\x1b[31m✖ ${failed} checks failed:\x1b[0m`);
  for (const f of failures) console.log(`   - ${f}`);
  process.exit(1);
}
