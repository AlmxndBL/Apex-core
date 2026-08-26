<script setup lang="ts">
defineProps<{
  status: 'loading' | 'empty' | 'error' | 'ready'
  emptyMessage?: string
  errorMessage?: string
  errorSubtext?: string
}>()

const emit = defineEmits<{
  (e: 'retry'): void
  (e: 'emptyAction'): void
}>()
</script>

<template>
  <div>
    <!-- 1. Loading State -->
    <div v-if="status === 'loading'">
      <slot name="loading">
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 space-y-2 animate-pulse">
          <div class="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
          <div class="space-y-1.5 pt-1">
            <div class="h-6 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
            <div class="h-6 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
            <div class="h-6 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
          </div>
        </div>
      </slot>
    </div>

    <!-- 2. Error State -->
    <div
      v-else-if="status === 'error'"
      class="flex flex-col items-center justify-center rounded-lg border border-rose-200 bg-rose-50/50 p-6 text-center dark:border-rose-900/50 dark:bg-rose-950/20"
    >
      <slot name="error">
        <div class="rounded-full bg-rose-100 p-2 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400 mb-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" x2="12" y1="9" y2="13" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
          </svg>
        </div>
        <h3 class="text-xs font-semibold text-rose-900 dark:text-rose-200">
          {{ errorMessage || 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้' }}
        </h3>
        <p class="mt-0.5 text-[10px] text-rose-600 dark:text-rose-400 max-w-sm">
          {{ errorSubtext || 'เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง' }}
        </p>
        <button
          type="button"
          @click="emit('retry')"
          class="mt-2.5 inline-flex items-center gap-1 rounded bg-rose-600 px-2.5 py-1 text-[10px] font-semibold text-white transition hover:bg-rose-700 active:scale-95 shadow-2xs"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          <span>ลองใหม่อีกครั้ง (Retry)</span>
        </button>
      </slot>
    </div>

    <!-- 3. Empty State -->
    <div
      v-else-if="status === 'empty'"
      class="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-8 text-center"
    >
      <slot name="empty">
        <div class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
          </svg>
        </div>
        <h3 class="text-xs font-bold text-zinc-900 dark:text-zinc-100">
          {{ emptyMessage || 'ยังไม่มีข้อมูลในระบบ' }}
        </h3>
        <button
          type="button"
          @click="emit('emptyAction')"
          class="mt-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-[10px] font-semibold shadow-2xs active:scale-95 transition"
        >
          + สร้างรายการแรก
        </button>
      </slot>
    </div>

    <!-- 4. Ready State -->
    <slot v-else />
  </div>
</template>
