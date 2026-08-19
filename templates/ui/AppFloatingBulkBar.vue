<script setup lang="ts">
defineProps<{
  selectedCount: number
  totalCount?: number
  loading?: boolean
}>()

const emit = defineEmits(['delete', 'deselect-all'])
</script>

<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-12 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform ease-in duration-200 transition"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-12 opacity-0"
  >
    <div
      v-if="selectedCount > 0"
      class="fixed bottom-6 inset-x-4 max-w-xl mx-auto z-50 bg-[#0F2854] text-white p-3.5 sm:px-6 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-md flex items-center justify-between gap-4"
    >
      <div class="flex items-center gap-2.5 min-w-0">
        <span class="w-7 h-7 rounded-xl bg-blue-500/30 border border-blue-400/40 text-blue-200 flex items-center justify-center text-xs font-black">
          {{ selectedCount }}
        </span>
        <div class="truncate text-xs">
          <span class="font-bold">เลือกแล้ว {{ selectedCount }} รายการ</span>
          <span v-if="totalCount" class="text-slate-300 hidden sm:inline text-[11px]"> (จากทั้งหมด {{ totalCount }})</span>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          @click="emit('deselect-all')"
          class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors"
        >
          ยกเลิก
        </button>

        <button
          type="button"
          @click="emit('delete')"
          :disabled="loading"
          class="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
        >
          <span v-if="loading" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          <span>ลบรายการที่เลือก</span>
        </button>
      </div>
    </div>
  </Transition>
</template>
