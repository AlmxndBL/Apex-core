<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    isDark.value = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
  }
})
</script>

<template>
  <button
    type="button"
    @click="toggleTheme"
    class="relative flex items-center justify-center w-7 h-7 rounded border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 transition-colors focus:outline-none"
    title="สลับโหมดมืด / สว่าง (Animated Theme Toggler)"
    aria-label="Toggle theme"
  >
    <!-- Sun Icon -->
    <svg
      class="w-3.5 h-3.5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
    <!-- Moon Icon -->
    <svg
      class="w-3.5 h-3.5 absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  </button>
</template>
