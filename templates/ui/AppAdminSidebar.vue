<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface NavItem {
  id: string
  label: string
  to?: string
  icon?: string
  badge?: string
  badgeColor?: 'blue' | 'rose' | 'amber' | 'emerald' | 'slate'
  active?: boolean
  onClick?: () => void
}

export interface NavGroup {
  id: string
  title: string
  items: NavItem[]
}

export interface UserProfile {
  name: string
  role: string
  email?: string
  avatarUrl?: string
  initials?: string
}

const props = withDefaults(
  defineProps<{
    systemName?: string
    systemTag?: string
    navGroups: NavGroup[]
    user?: UserProfile
    modelValue?: boolean // Mobile open state
    collapsed?: boolean // Desktop collapsed state
    storageKey?: string
  }>(),
  {
    systemName: 'Apex Enterprise',
    systemTag: 'Apex v2.5.3',
    storageKey: 'apex_admin_sidebar_collapsed',
    user: () => ({
      name: 'Admin User',
      role: 'Super Administrator',
      email: 'admin@apex-core.dev',
      initials: 'AD',
    }),
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:collapsed', value: boolean): void
  (e: 'navigate', item: NavItem): void
  (e: 'logout'): void
  (e: 'settings'): void
}>()

// Desktop Collapsed State (persisted to localStorage)
const isCollapsed = ref(false)

// Mobile Drawer Open State
const isMobileOpen = computed({
  get: () => props.modelValue ?? false,
  set: (val) => emit('update:modelValue', val),
})

// Upward Popover State for Profile
const isProfilePopoverOpen = ref(false)
const profileTriggerRef = ref<HTMLElement | null>(null)
const profilePopoverRef = ref<HTMLElement | null>(null)

// Dark Theme Toggle Simulation / Emitter
const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
  if (typeof window !== 'undefined') {
    localStorage.setItem(props.storageKey, isCollapsed.value ? 'true' : 'false')
  }
}

const closeMobileDrawer = () => {
  isMobileOpen.value = false
}

const handleItemClick = (item: NavItem) => {
  if (item.onClick) {
    item.onClick()
  }
  emit('navigate', item)
  closeMobileDrawer()
}

// Click outside handler for profile popover
const handleClickOutside = (event: MouseEvent) => {
  if (
    isProfilePopoverOpen.value &&
    profilePopoverRef.value &&
    !profilePopoverRef.value.contains(event.target as Node) &&
    profileTriggerRef.value &&
    !profileTriggerRef.value.contains(event.target as Node)
  ) {
    isProfilePopoverOpen.value = false
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(props.storageKey)
    if (saved !== null) {
      isCollapsed.value = saved === 'true'
    } else if (props.collapsed !== undefined) {
      isCollapsed.value = props.collapsed
    }
    isDarkMode.value = document.documentElement.classList.contains('dark')
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('click', handleClickOutside)
  }
})

// Badge style helper
const getBadgeClass = (color: NavItem['badgeColor'] = 'blue') => {
  const map = {
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-[#1C4D8D] dark:text-blue-300 border-blue-200 dark:border-blue-800',
    rose: 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    amber: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  }
  return map[color] || map.blue
}
</script>

<template>
  <div>
    <!-- Mobile Backdrop Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileOpen"
        @click="closeMobileDrawer"
        class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        aria-hidden="true"
      />
    </Transition>

    <!-- Sidebar Container -->
    <aside
      :class="[
        'fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 select-none transition-all duration-300 ease-in-out',
        // Mobile visibility
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        // Desktop width
        isCollapsed ? 'lg:w-20' : 'lg:w-64',
        'w-64' // Always 64 on mobile when opened
      ]"
    >
      <!-- Floating Border Expand Button (Visible on Desktop when Collapsed) -->
      <button
        v-if="isCollapsed"
        type="button"
        @click="toggleCollapse"
        title="ขยายแถบเมนู (Expand Sidebar)"
        class="hidden lg:flex absolute -right-3 top-4.5 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-slate-500 hover:text-[#1C4D8D] dark:text-slate-400 dark:hover:text-blue-300 items-center justify-center hover:scale-110 active:scale-95 transition-all z-20"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <!-- ========================================== -->
      <!-- Tier 1: Header & Branding (h-15 / 60px)      -->
      <!-- ========================================== -->
      <div class="h-15 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 shrink-0">
        <div class="flex items-center gap-3 min-w-0 overflow-hidden">
          <!-- Logo Icon -->
          <div class="w-9 h-9 shrink-0 rounded-2xl bg-gradient-to-br from-[#1C4D8D] to-[#0F2854] flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#1C4D8D]/25 ring-1 ring-white/20">
            <slot name="logo">
              <span>AX</span>
            </slot>
          </div>

          <!-- Brand & Tag (Hidden when collapsed on desktop) -->
          <div
            :class="[
              'flex flex-col min-w-0 transition-opacity duration-200',
              isCollapsed ? 'lg:hidden' : 'opacity-100'
            ]"
          >
            <div class="flex items-center gap-1.5">
              <span class="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white truncate">
                {{ systemName }}
              </span>
            </div>
            <span class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {{ systemTag }}
            </span>
          </div>
        </div>

        <!-- Desktop Collapse Button (Inside Header when Expanded) -->
        <button
          v-if="!isCollapsed"
          type="button"
          @click="toggleCollapse"
          title="ย่อแถบเมนู (Collapse Sidebar)"
          class="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <!-- Mobile Close Button -->
        <button
          type="button"
          @click="closeMobileDrawer"
          class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- ========================================== -->
      <!-- Tier 2: Grouped Navigation (Scrollable)    -->
      <!-- ========================================== -->
      <nav class="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 custom-scrollbar">
        <div v-for="group in navGroups" :key="group.id" class="space-y-1">
          <!-- Group Title -->
          <div v-if="!isCollapsed" class="px-3 pt-2 pb-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {{ group.title }}
            </span>
          </div>
          <!-- Collapsed Divider for Desktop -->
          <div v-else class="hidden lg:block border-t border-slate-200/60 dark:border-slate-800 my-2 mx-2" :title="group.title" />

          <!-- Group Items -->
          <ul class="space-y-1">
            <li v-for="item in group.items" :key="item.id" class="relative group">
              <a
                :href="item.to || '#'"
                @click.prevent="handleItemClick(item)"
                :class="[
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 relative select-none',
                  item.active
                    ? 'bg-[#1C4D8D] text-white shadow-sm shadow-[#1C4D8D]/30 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white',
                  isCollapsed ? 'lg:justify-center lg:px-2' : ''
                ]"
              >
                <!-- Menu Icon (or fallback slot) -->
                <span
                  :class="[
                    'shrink-0 transition-transform duration-150 group-hover:scale-110',
                    item.active ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  ]"
                >
                  <slot :name="`icon-${item.id}`">
                    <svg v-if="!item.icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <!-- Custom SVG if icon name provided -->
                    <span v-else v-html="item.icon" class="inline-block w-4 h-4" />
                  </slot>
                </span>

                <!-- Menu Label (Hidden in Desktop Collapsed Mode) -->
                <span
                  :class="[
                    'truncate flex-1',
                    isCollapsed ? 'lg:hidden' : 'block'
                  ]"
                >
                  {{ item.label }}
                </span>

                <!-- Notification Badge -->
                <span
                  v-if="item.badge && (!isCollapsed || isMobileOpen)"
                  :class="[
                    'text-[10px] font-bold px-1.5 py-0.2 rounded-md border shrink-0',
                    item.active ? 'bg-white/20 text-white border-white/20' : getBadgeClass(item.badgeColor)
                  ]"
                >
                  {{ item.badge }}
                </span>
              </a>

              <!-- Hover Tooltip on Desktop Collapsed Mode -->
              <div
                v-if="isCollapsed"
                class="hidden lg:group-hover:flex absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl border border-slate-700 whitespace-nowrap z-50 pointer-events-none items-center gap-1.5 animate-in fade-in zoom-in-95 duration-100"
              >
                <span>{{ item.label }}</span>
                <span
                  v-if="item.badge"
                  :class="['text-[9px] px-1 py-0.2 rounded font-bold', getBadgeClass(item.badgeColor)]"
                >
                  {{ item.badge }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <!-- ========================================== -->
      <!-- Tier 3: User Profile & Popover Footer      -->
      <!-- ========================================== -->
      <div class="relative border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3 shrink-0">
        <!-- Upward Floating Profile Popover -->
        <Transition
          enter-active-class="transition ease-out duration-150"
          enter-from-class="opacity-0 translate-y-2 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-2 scale-95"
        >
          <div
            v-if="isProfilePopoverOpen"
            ref="profilePopoverRef"
            :class="[
              'absolute bottom-full mb-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 text-xs select-none',
              isCollapsed ? 'left-2 w-56' : 'left-3 right-3'
            ]"
          >
            <!-- User Summary Header -->
            <div class="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800/80">
              <p class="font-bold text-slate-900 dark:text-white truncate">{{ user.name }}</p>
              <p class="text-[11px] text-slate-400 dark:text-slate-500 truncate">{{ user.email || user.role }}</p>
            </div>

            <!-- Popover Navigation Links -->
            <div class="py-1.5 space-y-0.5">
              <button
                type="button"
                @click="emit('settings'); isProfilePopoverOpen = false"
                class="w-full px-3 py-2 rounded-xl text-left font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center gap-2.5 transition-colors"
              >
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.6 6.6 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <span>ตั้งค่าบัญชี (Settings)</span>
              </button>

              <!-- Dark Mode Switch -->
              <button
                type="button"
                @click="toggleDarkMode"
                class="w-full px-3 py-2 rounded-xl text-left font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center justify-between transition-colors"
              >
                <div class="flex items-center gap-2.5">
                  <svg v-if="isDarkMode" class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                  <span>โหมดมืด (Dark Mode)</span>
                </div>
                <span
                  :class="[
                    'w-7 h-4 rounded-full p-0.5 transition-colors',
                    isDarkMode ? 'bg-[#1C4D8D]' : 'bg-slate-300 dark:bg-slate-700'
                  ]"
                >
                  <span
                    :class="[
                      'block w-3 h-3 rounded-full bg-white transition-transform',
                      isDarkMode ? 'translate-x-3' : 'translate-x-0'
                    ]"
                  />
                </span>
              </button>
            </div>

            <!-- Logout Action -->
            <div class="pt-1.5 border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                @click="emit('logout'); isProfilePopoverOpen = false"
                class="w-full px-3 py-2 rounded-xl text-left font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
                <span>ออกจากระบบ (Logout)</span>
              </button>
            </div>
          </div>
        </Transition>

        <!-- User Profile Trigger Button -->
        <button
          ref="profileTriggerRef"
          type="button"
          @click="isProfilePopoverOpen = !isProfilePopoverOpen"
          :class="[
            'w-full flex items-center gap-3 p-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/80 transition-all duration-150 text-left group',
            isCollapsed ? 'lg:justify-center' : ''
          ]"
        >
          <!-- User Avatar -->
          <div class="w-8 h-8 shrink-0 rounded-xl bg-gradient-to-tr from-[#1C4D8D] to-blue-400 text-white flex items-center justify-center font-black text-xs shadow-sm ring-1 ring-white/30">
            <img
              v-if="user.avatarUrl"
              :src="user.avatarUrl"
              :alt="user.name"
              class="w-full h-full object-cover rounded-xl"
            />
            <span v-else>{{ user.initials || 'AD' }}</span>
          </div>

          <!-- User Info (Hidden in Desktop Collapsed Mode) -->
          <div
            :class="[
              'min-w-0 flex-1 transition-opacity duration-200',
              isCollapsed ? 'lg:hidden' : 'block'
            ]"
          >
            <p class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-[#1C4D8D] dark:group-hover:text-blue-300">
              {{ user.name }}
            </p>
            <p class="text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate">
              {{ user.role }}
            </p>
          </div>

          <!-- Chevron Up/Down Icon -->
          <svg
            :class="[
              'w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0',
              isProfilePopoverOpen ? 'rotate-180 text-[#1C4D8D]' : '',
              isCollapsed ? 'lg:hidden' : 'block'
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* Compact scrollbar for high-density SaaS */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}
</style>
