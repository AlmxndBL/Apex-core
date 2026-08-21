<script setup lang="ts">
import { ref, computed } from 'vue'
import AppFloatingBulkBar from './AppFloatingBulkBar.vue'

export interface TableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  width?: string
}

export interface FilterTab {
  id: string
  label: string
  count?: number
  value?: string | null
}

export interface EnterpriseRecord {
  id: string | number
  code: string
  title: string
  category: string
  amount: number
  date: string
  status: 'completed' | 'processing' | 'pending' | 'cancelled' | string
  statusLabel?: string
  customer?: {
    name: string
    avatar?: string
    phone?: string
  }
  [key: string]: any
}

const props = withDefaults(
  defineProps<{
    columns?: TableColumn[]
    items?: EnterpriseRecord[]
    filterTabs?: FilterTab[]
    title?: string
    searchPlaceholder?: string
    deleteLoading?: boolean
  }>(),
  {
    title: 'รายการข้อมูลทั้งหมด',
    searchPlaceholder: 'ค้นหาด้วยรหัส, ชื่อลูกค้า หรือหมวดหมู่...',
    deleteLoading: false,
    columns: () => [
      { key: 'select', label: '', width: 'w-12', align: 'center' },
      { key: 'code', label: 'รหัสรายการ', width: 'w-32', sortable: true },
      { key: 'customer', label: 'ผู้ทำรายการ / ลูกค้า', sortable: true },
      { key: 'category', label: 'หมวดหมู่', width: 'w-36' },
      { key: 'date', label: 'วันที่ทำรายการ', width: 'w-32', sortable: true },
      { key: 'amount', label: 'ยอดเงินสุทธิ', width: 'w-36', align: 'right', sortable: true },
      { key: 'status', label: 'สถานะ', width: 'w-36', align: 'center', sortable: true },
      { key: 'actions', label: 'จัดการ', width: 'w-28', align: 'right' },
    ],
    filterTabs: () => [
      { id: 'all', label: 'ทั้งหมด', value: null },
      { id: 'pending', label: 'รอตรวจสอบ', value: 'pending' },
      { id: 'processing', label: 'กำลังดำเนินการ', value: 'processing' },
      { id: 'completed', label: 'อนุมัติ / สำเร็จ', value: 'completed' },
      { id: 'cancelled', label: 'ยกเลิก', value: 'cancelled' },
    ],
    items: () => [
      {
        id: 1,
        code: 'TX-2026-0801',
        title: 'สัญญาเช่าห้อง 402',
        category: 'สัญญาเช่า & มัดจำ',
        amount: 14500,
        date: '21 ส.ค. 2026',
        status: 'completed',
        statusLabel: 'อนุมัติแล้ว',
        customer: { name: 'กิตติศักดิ์ พรชัย', phone: '081-234-5678' }
      },
      {
        id: 2,
        code: 'TX-2026-0802',
        title: 'ค่าน้ำ-ค่าไฟ อาคาร B',
        category: 'บิลประจำเดือน',
        amount: 3250.50,
        date: '21 ส.ค. 2026',
        status: 'pending',
        statusLabel: 'รอตรวจสลิป',
        customer: { name: 'พิมพ์ใจ วงศ์สว่าง', phone: '089-876-5432' }
      },
      {
        id: 3,
        code: 'TX-2026-0803',
        title: 'ค่าบริการส่วนกลาง 2026',
        category: 'ค่าส่วนกลาง',
        amount: 8900,
        date: '20 ส.ค. 2026',
        status: 'processing',
        statusLabel: 'รอตัดบัญชี',
        customer: { name: 'ธนากร รัตนกุล', phone: '062-555-1122' }
      },
      {
        id: 4,
        code: 'TX-2026-0804',
        title: 'เงินประกันกุญแจคีย์การ์ด',
        category: 'ค่ามัดจำ',
        amount: 1000,
        date: '19 ส.ค. 2026',
        status: 'completed',
        statusLabel: 'อนุมัติแล้ว',
        customer: { name: 'มนัสวี โสภณ', phone: '095-444-3322' }
      },
      {
        id: 5,
        code: 'TX-2026-0805',
        title: 'ยกเลิกการจองห้อง 205',
        category: 'ยกเลิกสัญญา',
        amount: 5000,
        date: '18 ส.ค. 2026',
        status: 'cancelled',
        statusLabel: 'ยกเลิกแล้ว',
        customer: { name: 'วรภัทร ชาญวิทย์', phone: '084-111-9988' }
      }
    ]
  }
)

const emit = defineEmits<{
  (e: 'edit', record: EnterpriseRecord): void
  (e: 'view', record: EnterpriseRecord): void
  (e: 'delete-selected', ids: Array<string | number>): void
  (e: 'action', payload: { action: string; record: EnterpriseRecord }): void
}>()

// State
const searchQuery = ref('')
const activeTabId = ref(props.filterTabs[0]?.id || 'all')
const selectedRowIds = ref<Array<string | number>>([])
const sortKey = ref<string>('date')
const sortOrder = ref<'asc' | 'desc'>('desc')

// Filtered & Searched Data
const filteredItems = computed(() => {
  let result = [...props.items]

  // 1. Filter by Active Tab
  const activeTab = props.filterTabs.find(t => t.id === activeTabId.value)
  if (activeTab && activeTab.value) {
    result = result.filter(item => item.status === activeTab.value)
  }

  // 2. Search Query Filtering
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(item => {
      return (
        item.code?.toLowerCase().includes(q) ||
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.customer?.name?.toLowerCase().includes(q) ||
        item.customer?.phone?.includes(q) ||
        item.amount?.toString().includes(q)
      )
    })
  }

  // 3. Sorting
  if (sortKey.value) {
    result.sort((a, b) => {
      let aVal = a[sortKey.value]
      let bVal = b[sortKey.value]

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = (bVal || '').toString().toLowerCase()
      }

      if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})

// Tab Count Dynamic Calculator
const getTabCount = (tab: FilterTab) => {
  if (tab.count !== undefined) return tab.count
  if (!tab.value) return props.items.length
  return props.items.filter(item => item.status === tab.value).length
}

// Multi-select Checkbox Handlers
const isAllSelected = computed(() => {
  return (
    filteredItems.value.length > 0 &&
    filteredItems.value.every(item => selectedRowIds.value.includes(item.id))
  )
})

const isSomeSelected = computed(() => {
  return (
    selectedRowIds.value.length > 0 &&
    !isAllSelected.value &&
    filteredItems.value.some(item => selectedRowIds.value.includes(item.id))
  )
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedRowIds.value = []
  } else {
    selectedRowIds.value = filteredItems.value.map(item => item.id)
  }
}

const toggleRowSelect = (id: string | number) => {
  const index = selectedRowIds.value.indexOf(id)
  if (index > -1) {
    selectedRowIds.value.splice(index, 1)
  } else {
    selectedRowIds.value.push(id)
  }
}

const isRowSelected = (id: string | number) => {
  return selectedRowIds.value.includes(id)
}

const clearSelection = () => {
  selectedRowIds.value = []
}

// Sorting toggle handler
const handleSort = (colKey: string) => {
  if (sortKey.value === colKey) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = colKey
    sortOrder.value = 'desc'
  }
}

// Currency Formatter
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val)
}

// Status Badges Theme Helper
const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
    case 'active':
    case 'available':
      return {
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80',
        dotClass: 'bg-emerald-500 shadow-xs shadow-emerald-500/50 animate-pulse',
        label: 'อนุมัติ / เสร็จสมบูรณ์'
      }
    case 'processing':
    case 'occupied':
    case 'in_progress':
      return {
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80',
        dotClass: 'bg-[#1C4D8D] dark:bg-blue-400 shadow-xs shadow-blue-500/50',
        label: 'กำลังดำเนินการ'
      }
    case 'pending':
    case 'review':
    case 'waiting':
      return {
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80',
        dotClass: 'bg-amber-500 shadow-xs shadow-amber-500/50',
        label: 'รอตรวจสอบ'
      }
    case 'cancelled':
    case 'rejected':
    case 'danger':
      return {
        badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80',
        dotClass: 'bg-rose-500',
        label: 'ยกเลิก / ปฏิเสธ'
      }
    default:
      return {
        badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
        dotClass: 'bg-slate-400',
        label: status
      }
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- ========================================== -->
    <!-- 1. Toolbar & Search Capsule Container      -->
    <!-- ========================================== -->
    <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
      <!-- Filter Tabs (Horizontal Scrollable) -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
        <button
          v-for="tab in filterTabs"
          :key="tab.id"
          type="button"
          @click="activeTabId = tab.id"
          :class="[
            'px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all duration-150 flex items-center gap-2 whitespace-nowrap shrink-0',
            activeTabId === tab.id
              ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/25'
              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-slate-900 dark:hover:text-white'
          ]"
        >
          <span>{{ tab.label }}</span>
          <span
            :class="[
              'px-1.5 py-0.2 rounded-full text-[10px] font-extrabold',
              activeTabId === tab.id
                ? 'bg-white/20 text-white'
                : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            ]"
          >
            {{ getTabCount(tab) }}
          </span>
        </button>
      </div>

      <!-- Smart Search Input with Clear Button -->
      <div class="relative w-full sm:w-72 shrink-0">
        <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        <input
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="w-full pl-9 pr-8 py-2 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-[#1C4D8D] focus:ring-2 focus:ring-[#1C4D8D]/20 outline-none transition-all"
        />

        <button
          v-if="searchQuery"
          type="button"
          @click="searchQuery = ''"
          title="ล้างคำค้นหา"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-[10px] font-bold transition-colors"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Results Counter Subheader -->
    <div v-if="searchQuery.trim()" class="px-2 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
      <span>
        ผลการค้นหาสำหรับ <span class="text-[#1C4D8D] dark:text-blue-300 font-bold font-mono">"{{ searchQuery }}"</span>
        พบ <span class="font-bold text-slate-900 dark:text-white">{{ filteredItems.length }}</span> จาก {{ items.length }} รายการ
      </span>
      <button
        type="button"
        @click="searchQuery = ''"
        class="text-xs text-[#1C4D8D] dark:text-blue-400 hover:underline"
      >
        รีเซ็ตการค้นหา
      </button>
    </div>

    <!-- ========================================== -->
    <!-- 2. Data Table Container                   -->
    <!-- ========================================== -->
    <div class="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <!-- Table Header -->
          <thead class="bg-slate-50/90 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider select-none">
            <tr>
              <th
                v-for="col in columns"
                :key="col.key"
                :class="[
                  'py-3.5 px-4',
                  col.width || '',
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                ]"
              >
                <!-- Select All Checkbox -->
                <div v-if="col.key === 'select'" class="flex items-center justify-center">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    :indeterminate="isSomeSelected"
                    @change="toggleSelectAll"
                    class="w-4 h-4 rounded-md text-[#1C4D8D] focus:ring-[#1C4D8D] dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer"
                  />
                </div>

                <!-- Sortable Header Column -->
                <button
                  v-else-if="col.sortable"
                  type="button"
                  @click="handleSort(col.key)"
                  class="inline-flex items-center gap-1.5 hover:text-[#1C4D8D] dark:hover:text-blue-300 transition-colors group"
                >
                  <span>{{ col.label }}</span>
                  <span class="text-slate-400 group-hover:text-[#1C4D8D]">
                    <svg v-if="sortKey === col.key && sortOrder === 'asc'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                    <svg v-else-if="sortKey === col.key && sortOrder === 'desc'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    <svg v-else class="w-3 h-3 opacity-40 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                  </span>
                </button>

                <!-- Normal Column Header -->
                <span v-else>{{ col.label }}</span>
              </th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
            <template v-if="filteredItems.length > 0">
              <tr
                v-for="record in filteredItems"
                :key="record.id"
                :class="[
                  'transition-colors duration-150',
                  isRowSelected(record.id)
                    ? 'bg-blue-50/60 dark:bg-blue-950/30'
                    : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                ]"
              >
                <!-- Select Checkbox -->
                <td class="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    :checked="isRowSelected(record.id)"
                    @change="toggleRowSelect(record.id)"
                    class="w-4 h-4 rounded-md text-[#1C4D8D] focus:ring-[#1C4D8D] dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer"
                  />
                </td>

                <!-- Code Column -->
                <td class="py-3 px-4">
                  <span class="font-mono font-black text-slate-900 dark:text-white text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    {{ record.code }}
                  </span>
                </td>

                <!-- Customer / Title Column -->
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs">
                      {{ record.customer?.name ? record.customer.name.charAt(0) : 'U' }}
                    </div>
                    <div class="min-w-0">
                      <p class="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {{ record.customer?.name || record.title }}
                      </p>
                      <p class="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">
                        {{ record.customer?.phone || record.title }}
                      </p>
                    </div>
                  </div>
                </td>

                <!-- Category Column -->
                <td class="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">
                  {{ record.category }}
                </td>

                <!-- Date Column -->
                <td class="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                  {{ record.date }}
                </td>

                <!-- Amount Column (Financial Formatting) -->
                <td class="py-3 px-4 text-right">
                  <span class="font-mono font-black text-sm text-slate-900 dark:text-white tabular-nums">
                    <span class="text-xs text-slate-400 font-normal mr-0.5">฿</span>{{ formatCurrency(record.amount) }}
                  </span>
                </td>

                <!-- Status Column (Pill Capsule Badge) -->
                <td class="py-3 px-4 text-center">
                  <span
                    :class="[
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold select-none whitespace-nowrap',
                      getStatusConfig(record.status).badgeClass
                    ]"
                  >
                    <span :class="['w-1.5 h-1.5 rounded-full shrink-0', getStatusConfig(record.status).dotClass]" />
                    <span>{{ record.statusLabel || getStatusConfig(record.status).label }}</span>
                  </span>
                </td>

                <!-- Actions Column -->
                <td class="py-3 px-4 text-right whitespace-nowrap">
                  <div class="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      @click="emit('edit', record)"
                      class="px-3 py-1 rounded-xl text-xs font-bold bg-[#1C4D8D] hover:bg-[#0F2854] text-white transition-all shadow-xs active:scale-95"
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      @click="emit('view', record)"
                      class="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="ดูรายละเอียด"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </template>

            <!-- ========================================== -->
            <!-- 3. Empty State                             -->
            <!-- ========================================== -->
            <tr v-else>
              <td :colspan="columns.length" class="py-12 px-4 text-center">
                <div class="max-w-sm mx-auto flex flex-col items-center justify-center space-y-3">
                  <div class="w-14 h-14 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <h3 class="text-sm font-bold text-slate-900 dark:text-white">ไม่พบรายการข้อมูลที่ตรงกับเงื่อนไข</h3>
                  <p class="text-xs text-slate-400 dark:text-slate-500">
                    ลองเปลี่ยนคำค้นหา หรือเลือกแท็บสถานะอื่นเพื่อดูรายการข้อมูล
                  </p>
                  <button
                    v-if="searchQuery"
                    type="button"
                    @click="searchQuery = ''"
                    class="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    ล้างคำค้นหาทั้งหมด
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 4. Floating Multi-select Bulk Bar          -->
    <!-- ========================================== -->
    <AppFloatingBulkBar
      :selected-count="selectedRowIds.length"
      :total-count="filteredItems.length"
      :loading="deleteLoading"
      @deselect-all="clearSelection"
      @delete="emit('delete-selected', selectedRowIds)"
    />
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 5px;
  width: 5px;
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
