'use client'

import React from 'react'
import { Trash2 } from 'lucide-react'

export interface AppFloatingBulkBarProps {
  selectedCount: number
  totalCount?: number
  loading?: boolean
  onDelete: () => void
  onDeselectAll: () => void
}

export function AppFloatingBulkBar({
  selectedCount,
  totalCount,
  loading = false,
  onDelete,
  onDeselectAll,
}: AppFloatingBulkBarProps) {
  if (selectedCount <= 0) return null

  return (
    <div className="fixed bottom-6 inset-x-4 max-w-xl mx-auto z-50 bg-[#0F2854] text-white p-3.5 sm:px-6 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-md flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-7 h-7 rounded-xl bg-blue-500/30 border border-blue-400/40 text-blue-200 flex items-center justify-center text-xs font-black">
          {selectedCount}
        </span>
        <div className="truncate text-xs">
          <span className="font-bold">เลือกแล้ว {selectedCount} รายการ</span>
          {totalCount && (
            <span className="text-slate-300 hidden sm:inline text-[11px]">
              {' '}(จากทั้งหมด {totalCount})
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onDeselectAll}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors"
        >
          ยกเลิก
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={loading}
          className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
        >
          {loading ? (
            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
          <span>ลบรายการที่เลือก</span>
        </button>
      </div>
    </div>
  )
}
