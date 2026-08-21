<script setup lang="ts">
import { ref } from 'vue'
import AppAdminSidebar, { type NavGroup, type UserProfile, type NavItem } from './AppAdminSidebar.vue'

const props = withDefaults(
  defineProps<{
    systemName?: string
    systemTag?: string
    navGroups: NavGroup[]
    user?: UserProfile
    pageTitle?: string
    breadcrumbs?: Array<{ label: string; to?: string }>
  }>(),
  {
    systemName: 'Apex Enterprise',
    systemTag: 'Apex v2.5.3',
    pageTitle: 'Dashboard',
    breadcrumbs: () => [{ label: 'Home', to: '/' }, { label: 'Admin' }],
  }
)

const emit = defineEmits<{
  (e: 'navigate', item: NavItem): void
  (e: 'logout'): void
  (e: 'settings'): void
}>()

// Mobile Drawer State
const isMobileSidebarOpen = ref(false)

// Desktop Sidebar Collapsed State
const isDesktopCollapsed = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-row overflow-hidden font-sans">
    <!-- 1. Responsive Sidebar Component -->
    <AppAdminSidebar
      v-model="isMobileSidebarOpen"
      v-model:collapsed="isDesktopCollapsed"
      :system-name="systemName"
      :system-tag="systemTag"
      :nav-groups="navGroups"
      :user="user"
      @navigate="emit('navigate', $event)"
      @logout="emit('logout')"
      @settings="emit('settings')"
    >
      <template #logo>
        <slot name="sidebar-logo">
          <span>AX</span>
        </slot>
      </template>
    </AppAdminSidebar>

    <!-- 2. Main Content Viewport -->
    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <!-- Top Navigation Header (h-15 / 60px) -->
      <header class="h-15 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-30">
        <!-- Left: Mobile Menu Toggle & Breadcrumbs -->
        <div class="flex items-center gap-3 min-w-0">
          <!-- Mobile Drawer Toggle Button -->
          <button
            type="button"
            @click="isMobileSidebarOpen = true"
            class="lg:hidden p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="เปิดเมนู (Open Menu)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <!-- Breadcrumbs & Title -->
          <div class="flex flex-col min-w-0">
            <nav class="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 truncate">
              <template v-for="(crumb, idx) in breadcrumbs" :key="idx">
                <span v-if="idx > 0" class="text-slate-300 dark:text-slate-600">/</span>
                <a
                  v-if="crumb.to"
                  :href="crumb.to"
                  class="hover:text-[#1C4D8D] dark:hover:text-blue-300 transition-colors"
                >
                  {{ crumb.label }}
                </a>
                <span v-else class="text-slate-600 dark:text-slate-300">{{ crumb.label }}</span>
              </template>
            </nav>
            <h1 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate leading-tight">
              {{ pageTitle }}
            </h1>
          </div>
        </div>

        <!-- Right: Actions & User Header Extras -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <slot name="header-actions">
            <!-- Search Bar Mockup -->
            <div class="relative hidden md:block">
              <input
                type="text"
                placeholder="ค้นหาด่วน... (Ctrl + K)"
                class="w-48 lg:w-64 pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#1C4D8D] outline-none transition-all"
              />
              <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>

            <!-- Notifications Icon Button -->
            <button
              type="button"
              class="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="การแจ้งเตือน"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
          </slot>
        </div>
      </header>

      <!-- Main Body (Scrollable Container) -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.25);
  border-radius: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.45);
}
</style>
