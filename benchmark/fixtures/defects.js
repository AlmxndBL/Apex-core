/**
 * Real Code Defect Scenarios & Actual Diff Generators
 * 
 * Defines 5 realistic engineering bugs across the 5 fixture domains and generates
 * the exact code strings for 3 editing paradigms:
 * 1. Aider Whole-File Format (Complete rewritten file)
 * 2. Aider Unified Diff Format (Standard Git diff hunk with headers and context lines)
 * 3. Apex Surgical Patch (Rule 4 exact line slice replacement)
 */

export const REAL_DEFECT_SCENARIOS = [
  {
    fixtureFile: '01_backend_nitro.ts',
    name: 'Add Soft-Delete Filter & Status Code to Backend API',
    defectDescription: 'Ensure deletedAt filter is applied and status 200 is explicitly documented.',
    targetLineStart: 41,
    targetLineEnd: 45,
    targetContent: `  const whereClause: any = {
    deletedAt: null,
  };`,
    replacementContent: `  const whereClause: any = {
    deletedAt: null,
    status: 'ACTIVE',
  };`,
    unifiedDiff: `--- a/server/api/v1/users.ts
+++ b/server/api/v1/users.ts
@@ -41,5 +41,6 @@
   const whereClause: any = {
     deletedAt: null,
+    status: 'ACTIVE',
   };`,
  },
  {
    fixtureFile: '02_frontend_view.vue',
    name: 'Add AUDITOR Badge Color to Vue 3 Component',
    defectDescription: 'Add missing badge styling for AUDITOR role to prevent fallback to generic gray.',
    targetLineStart: 25,
    targetLineEnd: 33,
    targetContent: `function getRoleBadgeColor(role: string) {
  switch (role) {
    case 'ADMIN':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    case 'MEMBER':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    default:
      return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
  }
}`,
    replacementContent: `function getRoleBadgeColor(role: string) {
  switch (role) {
    case 'ADMIN':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    case 'MEMBER':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    case 'AUDITOR':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    default:
      return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
  }
}`,
    unifiedDiff: `--- a/components/UserList.vue
+++ b/components/UserList.vue
@@ -25,9 +25,11 @@
 function getRoleBadgeColor(role: string) {
   switch (role) {
     case 'ADMIN':
       return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800';
     case 'MEMBER':
       return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800';
+    case 'AUDITOR':
+      return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800';
     default:
       return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
   }
 }`,
  },
  {
    fixtureFile: '03_state_store.ts',
    name: 'Add Empty Query Guard in Composable Store',
    defectDescription: 'Prevent network race condition by validating member ID before dispatching optimistic update.',
    targetLineStart: 38,
    targetLineEnd: 43,
    targetContent: `  async function updateMemberOptimistic(id: string, updates: Partial<MemberItem>) {
    const originalList = [...members.value];
    const targetIdx = members.value.findIndex((m) => m.id === id);
    if (targetIdx === -1) return;`,
    replacementContent: `  async function updateMemberOptimistic(id: string, updates: Partial<MemberItem>) {
    if (!id || Object.keys(updates).length === 0) return;
    const originalList = [...members.value];
    const targetIdx = members.value.findIndex((m) => m.id === id);
    if (targetIdx === -1) return;`,
    unifiedDiff: `--- a/composables/useMemberStore.ts
+++ b/composables/useMemberStore.ts
@@ -38,6 +38,7 @@
   async function updateMemberOptimistic(id: string, updates: Partial<MemberItem>) {
+    if (!id || Object.keys(updates).length === 0) return;
     const originalList = [...members.value];
     const targetIdx = members.value.findIndex((m) => m.id === id);
     if (targetIdx === -1) return;`,
  },
  {
    fixtureFile: '04_schema.prisma',
    name: 'Add Compound Index on deletedAt & organizationId',
    defectDescription: 'Optimize high-traffic soft-delete filtering by adding a compound database index.',
    targetLineStart: 53,
    targetLineEnd: 57,
    targetContent: `  @@index([organizationId])
  @@index([teamId])
  @@index([email])
}`,
    replacementContent: `  @@index([organizationId])
  @@index([teamId])
  @@index([email])
  @@index([organizationId, deletedAt])
}`,
    unifiedDiff: `--- a/prisma/schema.prisma
+++ b/prisma/schema.prisma
@@ -53,4 +53,5 @@
   @@index([organizationId])
   @@index([teamId])
   @@index([email])
+  @@index([organizationId, deletedAt])
 }`,
  },
  {
    fixtureFile: '05_webhook_hmac.ts',
    name: 'Add Buffer Length Guard to Prevent TimingSafeEqual RangeError',
    defectDescription: 'Ensure signature buffer length matches HMAC buffer length before calling crypto.timingSafeEqual.',
    targetLineStart: 40,
    targetLineEnd: 44,
    targetContent: `  // 2. Cryptographic HMAC comparison
  const signedPayload = \`\${timestamp}.\${rawBody.toString('utf8')}\`;
  const computedHmac = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedHmac));`,
    replacementContent: `  // 2. Cryptographic HMAC comparison
  const signedPayload = \`\${timestamp}.\${rawBody.toString('utf8')}\`;
  const computedHmac = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');
  const sigBuf = Buffer.from(signature);
  const hmacBuf = Buffer.from(computedHmac);

  if (sigBuf.length !== hmacBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, hmacBuf);`,
    unifiedDiff: `--- a/server/api/v1/webhook.ts
+++ b/server/api/v1/webhook.ts
@@ -40,5 +40,8 @@
   // 2. Cryptographic HMAC comparison
   const signedPayload = \`\${timestamp}.\${rawBody.toString('utf8')}\`;
   const computedHmac = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');
+  const sigBuf = Buffer.from(signature);
+  const hmacBuf = Buffer.from(computedHmac);
 
-  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedHmac));
+  if (sigBuf.length !== hmacBuf.length) return false;
+  return crypto.timingSafeEqual(sigBuf, hmacBuf);`,
  },
];
