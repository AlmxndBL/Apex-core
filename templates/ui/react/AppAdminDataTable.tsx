'use client'

import React, { useState, useMemo } from 'react'
import { Search, X, ArrowUpDown, ChevronDown, ChevronUp, Edit3, Trash2 } from 'lucide-react'
import { AppFloatingBulkBar } from './AppFloatingBulkBar'

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
  [key: string]: unknown
}

export interface AppAdminDataTableProps {
  columns?: TableColumn[]
  items?: EnterpriseRecord[]
  filterTabs?: FilterTab[]
  title?: string
  searchPlaceholder?: string
  deleteLoading?: boolean
  onEdit?: (record: EnterpriseRecord) => void
  onDeleteSelected?: (ids: (string | number)[]) => void
}

const DEFAULT_COLUMNS: TableColumn[] = [
  { key: 'select', label: '', width: 'w-12', align: 'center' },
  { key: 'code', label: 'รหัสรายการ', width: 'w-32', sortable: true },
  { key: 'customer', label: 'ผู้ทำรายการ / ลูกค้า', sortable: true },
  { key: 'category', label: 'หมวดหมู่', width: 'w-36' },
  { key: 'date', label: 'วันที่ทำรายการ', width: 'w-32', sortable: true },
  { key: 'amount', label: 'ยอดเงินสุทธิ', width: 'w-36', align: 'right', sortable: true },
  { key: 'status', label: 'สถานะ', width: 'w-36', align: 'center', sortable: true },
  { key: 'actions', label: 'จัดการ', width: 'w-28', align: 'right' },
]

const DEFAULT_TABS: FilterTab[] = [
  { id: 'all', label: 'ทั้งหมด', value: null },
  { id: 'completed', label: 'สำเร็จแล้ว', value: 'completed' },
  { id: 'pending', label: 'รอดำเนินการ', value: 'pending' },
  { id: 'cancelled', label: 'ยกเลิก', value: 'cancelled' },
]

export function AppAdminDataTable({
  columns = DEFAULT_COLUMNS,
  items = [],
  filterTabs = DEFAULT_TABS,
  title = 'รายการข้อมูลทั้งหมด',
  searchPlaceholder = 'ค้นหาด้วยรหัส, ชื่อลูกค้า หรือหมวดหมู่...',
  deleteLoading = false,
  onEdit,
  onDeleteSelected,
}: AppAdminDataTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [sortKey, setSortKey] = useState<string>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Tab filter
      if (activeTab && item.status !== activeTab) return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchCode = item.code.toLowerCase().includes(q)
        const matchTitle = item.title.toLowerCase().includes(q)
        const matchCategory = item.category.toLowerCase().includes(q)
        const matchCustomer = item.customer?.name.toLowerCase().includes(q)
        if (!matchCode && !matchTitle && !matchCategory && !matchCustomer) return false
      }

      return true
    })
  }, [items, activeTab, searchQuery])

  // Sorted items
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal === bVal) return 0
      if (aVal === undefined || aVal === null) return 1
      if (bVal === undefined || bVal === null) return -1

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
      }

      const strA = String(aVal)
      const strB = String(bVal)
      return sortOrder === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA)
    })
  }, [filteredItems, sortKey, sortOrder])

  // Select all handler
  const isAllSelected = sortedItems.length > 0 && selectedIds.size === sortedItems.length

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(sortedItems.map((i) => i.id)))
    }
  }

  const handleToggleRow = (id: string | number) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-4">
      {/* Header Toolbar Capsule */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.value ?? null)}
                className={px-3 py-1.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap }
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={px-1.5 py-0.2 rounded-full text-[10px] }>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-8 py-2 text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] transition"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                {columns.map((col) => {
                  if (col.key === 'select') {
                    return (
                      <th key={col.key} className="py-3 px-4 w-12 text-center">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleToggleSelectAll}
                          className="rounded border-slate-300 text-[#1C4D8D] focus:ring-[#1C4D8D]"
                        />
                      </th>
                    )
                  }
                  return (
                    <th
                      key={col.key}
                      className={py-3 px-4  }
                    >
                      {col.sortable ? (
                        <button
                          type="button"
                          onClick={() => handleSort(col.key)}
                          className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition font-bold"
                        >
                          <span>{col.label}</span>
                          {sortKey === col.key ? (
                            sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-40" />
                          )}
                        </button>
                      ) : (
                        <span>{col.label}</span>
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
              {sortedItems.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-slate-400">
                    ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา
                  </td>
                </tr>
              ) : (
                sortedItems.map((record) => {
                  const isSelected = selectedIds.has(record.id)
                  return (
                    <tr
                      key={record.id}
                      className={	ransition-colors }
                    >
                      {columns.map((col) => {
                        if (col.key === 'select') {
                          return (
                            <td key={col.key} className="py-3 px-4 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleRow(record.id)}
                                className="rounded border-slate-300 text-[#1C4D8D] focus:ring-[#1C4D8D]"
                              />
                            </td>
                          )
                        }
                        if (col.key === 'code') {
                          return (
                            <td key={col.key} className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                              {record.code}
                            </td>
                          )
                        }
                        if (col.key === 'customer') {
                          return (
                            <td key={col.key} className="py-3 px-4">
                              <div className="font-semibold text-slate-900 dark:text-white">
                                {record.customer?.name ?? record.title}
                              </div>
                              {record.customer?.phone && (
                                <div className="text-[11px] text-slate-400">{record.customer.phone}</div>
                              )}
                            </td>
                          )
                        }
                        if (col.key === 'amount') {
                          return (
                            <td key={col.key} className="py-3 px-4 text-right font-mono font-black tabular-nums text-slate-900 dark:text-white">
                              ฿{record.amount.toLocaleString()}
                            </td>
                          )
                        }
                        if (col.key === 'status') {
                          const statusStyles =
                            record.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : record.status === 'pending'
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'

                          return (
                            <td key={col.key} className="py-3 px-4 text-center">
                              <span className={inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border }>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {record.statusLabel ?? record.status}
                              </span>
                            </td>
                          )
                        }
                        if (col.key === 'actions') {
                          return (
                            <td key={col.key} className="py-3 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => onEdit?.(record)}
                                className="p-1.5 text-slate-400 hover:text-[#1C4D8D] dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            </td>
                          )
                        }
                        return (
                          <td key={col.key} className="py-3 px-4 text-slate-600 dark:text-slate-300">
                            {String(record[col.key] ?? '-')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      <AppFloatingBulkBar
        selectedCount={selectedIds.size}
        totalCount={sortedItems.length}
        loading={deleteLoading}
        onDelete={() => onDeleteSelected?.(Array.from(selectedIds))}
        onDeselectAll={() => setSelectedIds(new Set())}
      />
    </div>
  )
}
