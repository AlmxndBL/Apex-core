<script setup lang="ts">
import { useToast } from './useToast'

const { toasts, remove } = useToast()
</script>

<template>
  <div class="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-for="t in toasts"
        :key="t.id"
        :class="[
          'pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 transition-all backdrop-blur-md',
          t.type === 'success' ? 'bg-white/95 border-emerald-200 text-slate-800 shadow-emerald-500/10' :
          t.type === 'error' ? 'bg-white/95 border-rose-200 text-slate-800 shadow-rose-500/10' :
          t.type === 'warning' ? 'bg-white/95 border-amber-200 text-slate-800 shadow-amber-500/10' :
          'bg-white/95 border-blue-200 text-slate-800 shadow-blue-500/10'
        ]"
      >
        <div class="flex-1 min-w-0 pt-0.5">
          <p class="text-xs font-bold text-slate-900 leading-snug">{{ t.title }}</p>
          <p v-if="t.message" class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{{ t.message }}</p>
        </div>
        <button @click="remove(t.id)" class="text-slate-400 hover:text-slate-600 p-1">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>
