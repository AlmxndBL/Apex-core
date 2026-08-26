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

const searchQuery = ref('')

const filteredNavGroups = computed(() => {
  if (!searchQuery.value.trim()) return props.navGroups
  const q = searchQuery.value.toLowerCase()
  return props.navGroups.map(group => ({
    ...group,
    items: group.items.filter(item => item.label.toLowerCase().includes(q))
  })).filter(group => group.items.length > 0)
})

const handleItemClick = (item: NavItem) => {
  if (item.onClick) {
    item.onClick()
  }
  emit('navigate', item)
  closeMobileDrawer()
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(props.storageKey)
    if (saved !== null) {
      isCollapsed.value = saved === 'true'
    } else if (props.collapsed !== undefined) {
      isCollapsed.value = props.collapsed
    }
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
      <!-- Tier 2: Search & Grouped Navigation        -->
      <!-- ========================================== -->
      <div class="px-3 pt-3 pb-1">
        <!-- Expanded Search Input -->
        <div v-if="!isCollapsed" class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="ค้นหาเมนู... (⌘K)"
            class="w-full pl-8 pr-10 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1C4D8D] focus:border-[#1C4D8D] transition-colors"
          />
          <svg class="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <kbd class="absolute right-2 top-2 text-[9px] bg-white dark:bg-slate-700 text-slate-500 px-1 rounded border border-slate-200 dark:border-slate-600 font-mono">⌘K</kbd>
        </div>
        <!-- Collapsed Search Button -->
        <div v-else class="flex justify-center">
          <button
            type="button"
            @click="isCollapsed = false"
            class="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#1C4D8D] hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
            title="ค้นหาเมนู (⌘K)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 custom-scrollbar">
        <div v-for="group in filteredNavGroups" :key="group.id" class="space-y-1">
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
      <!-- Tier 3: Minimalist System Footer           -->
      <!-- ========================================== -->
      <div class="px-3 py-2.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 shrink-0 text-slate-400 dark:text-slate-500 select-none">
        <div v-show="!isCollapsed" class="flex items-center justify-between text-[10px]">
          <span class="font-semibold truncate text-slate-600 dark:text-slate-400">{{ systemName }}</span>
          <span class="font-mono text-[9px] text-slate-400 dark:text-slate-500">{{ systemTag }}</span>
        </div>
        <div v-show="isCollapsed" class="flex justify-center py-0.5 text-[9px] font-mono font-bold text-slate-400" :title="`${systemName} ${systemTag}`">
          {{ systemTag.split(' ')[0] || 'v5' }}
        </div>
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
