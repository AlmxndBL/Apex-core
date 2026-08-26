<script setup lang="ts">
import { computed } from 'vue';

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER' | 'GUEST';
  createdAt: string;
}

const props = defineProps<{
  users: UserItem[];
  loading: boolean;
  error: string | null;
  selectedId?: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'retry'): void;
  (e: 'create'): void;
}>();

const hasData = computed(() => !props.loading && !props.error && props.users.length > 0);
const isEmpty = computed(() => !props.loading && !props.error && props.users.length === 0);

function getRoleBadgeColor(role: string) {
  switch (role) {
    case 'ADMIN':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    case 'MEMBER':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    default:
      return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
  }
}
</script>

<template>
  <div class="w-full space-y-4">
    <!-- 1. LOADING STATE (Layout Skeleton) -->
    <div v-if="loading" class="space-y-3 animate-pulse" aria-busy="true">
      <div class="h-10 bg-zinc-200/70 dark:bg-zinc-800 rounded-lg w-full" />
      <div v-for="i in 5" :key="i" class="h-14 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl w-full border border-zinc-200/50 dark:border-zinc-800" />
    </div>

    <!-- 2. ERROR STATE (Contrast Alert Card with Retry) -->
    <div
      v-else-if="error"
      class="p-6 border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl text-center space-y-3"
      role="alert"
    >
      <div class="inline-flex p-3 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-full">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-rose-900 dark:text-rose-200">Unable to Load Records</h3>
      <p class="text-xs text-rose-700 dark:text-rose-300 max-w-md mx-auto">{{ error }}</p>
      <button
        type="button"
        @click="emit('retry')"
        class="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] rounded-lg transition"
      >
        Try Again
      </button>
    </div>

    <!-- 3. EMPTY STATE (Dashed Container with Action CTA) -->
    <div
      v-else-if="isEmpty"
      class="p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 space-y-3"
    >
      <div class="w-12 h-12 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No Users in Directory</h3>
      <p class="text-xs text-zinc-500 max-w-sm mx-auto">Get started by inviting your first team member to the workspace.</p>
      <button
        type="button"
        @click="emit('create')"
        class="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 rounded-lg transition active:scale-[0.98]"
      >
        + Add New Member
      </button>
    </div>

    <!-- 4. DATA STATE (Responsive Enterprise Table) -->
    <div
      v-else-if="hasData"
      class="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm rounded-xl overflow-hidden"
    >
      <table class="w-full text-left text-xs">
        <thead class="bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 uppercase tracking-wider">
          <tr>
            <th class="p-3.5 font-medium">Name</th>
            <th class="p-3.5 font-medium">Email</th>
            <th class="p-3.5 font-medium">Role</th>
            <th class="p-3.5 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
          <tr
            v-for="u in users"
            :key="u.id"
            @click="emit('select', u.id)"
            class="cursor-pointer hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition duration-150"
            :class="{ 'bg-zinc-100/70 dark:bg-zinc-800/70': selectedId === u.id }"
          >
            <td class="p-3.5 font-semibold text-zinc-900 dark:text-zinc-100">{{ u.name }}</td>
            <td class="p-3.5 text-zinc-500">{{ u.email }}</td>
            <td class="p-3.5">
              <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border" :class="getRoleBadgeColor(u.role)">
                {{ u.role }}
              </span>
            </td>
            <td class="p-3.5 text-right font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
              Manage &rarr;
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
