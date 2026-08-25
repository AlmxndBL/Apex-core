<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppAdminSidebar, { type NavGroup, type UserProfile, type NavItem } from './AppAdminSidebar.vue'
import AnimatedThemeToggler from './AnimatedThemeToggler.vue'

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
    systemTag: 'Apex v5.0',
    pageTitle: 'Dashboard',
    breadcrumbs: () => [{ label: 'Home', to: '/' }, { label: 'Admin' }],
    user: () => ({
      name: 'สมชาย พัฒนากร',
      role: 'Super Administrator',
      email: 'somchai@enterprise.co.th',
      initials: 'SC',
    }),
  }
)

const emit = defineEmits<{
  (e: 'navigate', item: NavItem): void
  (e: 'logout'): void
  (e: 'settings'): void
  (e: 'profile'): void
}>()

// Mobile Drawer State
const isMobileSidebarOpen = ref(false)

// Desktop Sidebar Collapsed State
const isDesktopCollapsed = ref(false)

// User Profile Popover Dropdown State
const isProfileDropdownOpen = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)

const handleOutsideClick = (e: MouseEvent) => {
  if (userMenuRef.value && !userMenuRef.value.contains(e.target as Node)) {
    isProfileDropdownOpen.value = false
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleOutsideClick)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('click', handleOutsideClick)
  }
})
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
    >
      <template #logo>
        <slot name="sidebar-logo">
          <span>AX</span>
        </slot>
      </template>
    </AppAdminSidebar>

    <!-- 2. Main Content Viewport -->
    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <!-- Top Navigation Header (h-14 / 56px) -->
      <header class="h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-5 flex items-center justify-between gap-3 shrink-0 z-30">
        <!-- Left: Mobile Menu Toggle & Breadcrumbs -->
        <div class="flex items-center gap-3 min-w-0">
          <!-- Mobile Drawer Toggle Button -->
          <button
            type="button"
            @click="isMobileSidebarOpen = true"
            class="lg:hidden p-1.5 -ml-1 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
            <h1 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate leading-tight">
              {{ pageTitle }}
            </h1>
          </div>
        </div>

        <!-- Right: Animated Theme Toggler + Notifications + Actions + User Profile Menu Dropdown -->
        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <!-- Animated Theme Toggler -->
          <AnimatedThemeToggler />

          <!-- Notifications Icon Button -->
          <button
            type="button"
            class="relative p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="การแจ้งเตือน"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          <!-- Custom Header Action Slot -->
          <slot name="header-actions" />

          <!-- Divider -->
          <div class="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

          <!-- 👤 Top-Right User Menu Cluster -->
          <div ref="userMenuRef" class="relative">
            <button
              type="button"
              @click="isProfileDropdownOpen = !isProfileDropdownOpen"
              class="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left focus:outline-none shadow-2xs"
              title="เมนูผู้ใช้งาน (User Account Menu)"
            >
              <!-- Avatar Pill -->
              <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#1C4D8D] to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0 ring-1 ring-white/20">
                <img
                  v-if="user?.avatarUrl"
                  :src="user.avatarUrl"
                  :alt="user.name"
                  class="w-full h-full object-cover rounded-lg"
                />
                <span v-else>{{ user?.initials || 'AD' }}</span>
              </div>
              <!-- User Meta (Desktop) -->
              <div class="hidden md:flex flex-col min-w-0 pr-0.5 leading-tight">
                <span class="text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate max-w-[90px]">{{ user?.name }}</span>
                <span class="text-[9px] font-medium text-slate-400 dark:text-slate-500 truncate">{{ user?.role }}</span>
              </div>
              <!-- Chevron -->
              <svg
                class="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 transition-transform duration-150"
                :class="isProfileDropdownOpen ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <!-- Top-Right Dropdown Popover -->
            <Transition
              enter-active-class="transition ease-out duration-150"
              enter-from-class="opacity-0 translate-y-1 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-1 scale-95"
            >
              <div
                v-if="isProfileDropdownOpen"
                class="absolute right-0 top-full mt-1.5 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 text-xs select-none divide-y divide-slate-100 dark:divide-slate-800"
              >
                <!-- 1. Identity Header -->
                <div class="px-2.5 py-2">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1C4D8D] to-blue-500 text-white flex items-center justify-center font-black text-xs shadow-sm shrink-0">
                      {{ user?.initials || 'AD' }}
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="font-bold text-slate-900 dark:text-white truncate">{{ user?.name }}</p>
                      <p class="text-[10px] text-slate-400 dark:text-slate-500 truncate">{{ user?.email || user?.role }}</p>
                    </div>
                  </div>
                  <div class="mt-2 flex items-center justify-between">
                    <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#1C4D8D] dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 text-[9px] font-bold">
                      <span class="w-1 h-1 rounded-full bg-blue-500" />
                      {{ user?.role }}
                    </span>
                  </div>
                </div>

                <!-- 2. Navigation Links -->
                <div class="py-1 space-y-0.5">
                  <button
                    type="button"
                    @click="emit('profile'); isProfileDropdownOpen = false"
                    class="w-full px-2.5 py-1.5 rounded-xl text-left font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <span>ข้อมูลส่วนตัว (Profile)</span>
                  </button>

                  <button
                    type="button"
                    @click="emit('settings'); isProfileDropdownOpen = false"
                    class="w-full px-2.5 py-1.5 rounded-xl text-left font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.6 6.6 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <span>ตั้งค่าบัญชี (Settings)</span>
                  </button>
                </div>

                <!-- 3. Destructive Action -->
                <div class="pt-1">
                  <button
                    type="button"
                    @click="emit('logout'); isProfileDropdownOpen = false"
                    class="w-full px-2.5 py-1.5 rounded-xl text-left font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition-colors"
                  >
                    <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    <span>ออกจากระบบ (Logout)</span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
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
