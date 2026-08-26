<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  change?: string
  trendUp?: boolean
  subtitle?: string
}>()
</script>

<template>
  <div class="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/90 shadow-2xs space-y-1 relative overflow-hidden">
    <div class="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
      <span class="font-medium truncate">{{ title }}</span>
      <span class="w-3 h-3 text-zinc-400 dark:text-zinc-500 shrink-0">
        <slot name="icon" />
      </span>
    </div>
    <div class="flex items-baseline justify-between">
      <span class="text-base font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight font-mono">
        {{ value }}
      </span>
      <span
        v-if="change"
        :class="[
          'text-[9px] font-bold px-1 py-0.2 rounded flex items-center gap-0.5',
          trendUp
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
        ]"
      >
        <svg v-if="trendUp" class="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
        <svg v-else class="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
        <span>{{ change }}</span>
      </span>
    </div>
    <p v-if="subtitle" class="text-[9px] text-zinc-400 dark:text-zinc-500 truncate">{{ subtitle }}</p>
  </div>
</template>
