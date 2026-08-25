'use client'

import React from 'react'
import { Search, X, Download } from 'lucide-react'

export interface FilterOption {
  label: string
  value: string
}

export interface AppDataTableToolbarProps {
  keyword: string
  onKeywordChange: (val: string) => void
  selectedStatus: string
  onStatusChange: (val: string) => void
  statusOptions?: FilterOption[]
  datePreset?: string
  onDatePresetChange?: (preset: string) => void
  selectedCount?: number
  onExport?: () => void
  onResetFilters?: () => void
}

export function AppDataTableToolbar({
  keyword,
  onKeywordChange,
  selectedStatus,
  onStatusChange,
  statusOptions = [
    { label: 'ทุกสถานะ (All)', value: 'All' },
    { label: 'กำลังใช้งาน (Active)', value: 'Active' },
    { label: 'รอดำเนินการ (Pending)', value: 'Pending' },
    { label: 'หมดสัญญา (Expired)', value: 'Expired' },
  ],
  datePreset = '7D',
  onDatePresetChange,
  selectedCount = 0,
  onExport,
  onResetFilters,
}: AppDataTableToolbarProps) {
  const hasActiveFilters = Boolean(keyword || (selectedStatus && selectedStatus !== 'All'))

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
      {/* Left: Search & Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="ค้นหาข้อมูล..."
            className="w-48 sm:w-64 pl-6 pr-6 py-1 text-[11px] rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
          />
          <Search className="w-3 h-3 absolute left-1.5 top-2 text-zinc-400" />
          {keyword && (
            <button
              type="button"
              onClick={() => onKeywordChange('')}
              className="absolute right-1.5 top-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-[10px]"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-1 text-[11px]">
          <span className="text-zinc-400 font-medium hidden sm:inline">สถานะ:</span>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-2 py-1 text-[11px] rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 focus:ring-1 focus:ring-blue-600 font-medium"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Date Range Presets */}
        {onDatePresetChange && (
          <div className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded text-[10px] font-medium">
            {['7D', '30D', '1Y'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onDatePresetChange(p)}
                className={`px-2 py-0.5 rounded transition ${
                  datePreset === p
                    ? 'bg-white dark:bg-zinc-700 shadow-2xs text-zinc-900 dark:text-zinc-100 font-bold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {selectedCount > 0 && (
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-800">
            เลือกแล้ว {selectedCount} รายการ
          </span>
        )}

        {hasActiveFilters && onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-2 py-1 rounded text-[10px] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium transition"
          >
            ล้างตัวกรอง
          </button>
        )}

        {onExport && (
          <button
            type="button"
            onClick={onExport}
            className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition flex items-center gap-1"
          >
            <Download className="w-3 h-3 text-zinc-400" />
            <span>Export</span>
          </button>
        )}
      </div>
    </div>
  )
}
