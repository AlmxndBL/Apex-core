'use client'

import React, { useState, useEffect, ReactNode } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  to?: string
  icon?: ReactNode
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
  initials?: string
}

export interface AppAdminSidebarProps {
  systemName?: string
  systemTag?: string
  navGroups: NavGroup[]
  user?: UserProfile
  isMobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
  isCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  onNavigate?: (item: NavItem) => void
  onLogout?: () => void
  storageKey?: string
}

export function AppAdminSidebar({
  systemName = 'Apex Enterprise',
  systemTag = 'v5.0 Engine',
  navGroups,
  user = {
    name: 'สมชาย พัฒนากร',
    role: 'Super Administrator',
    email: 'somchai@enterprise.co.th',
    initials: 'SC',
  },
  isMobileOpen = false,
  onMobileOpenChange,
  isCollapsed: controlledCollapsed,
  onCollapsedChange,
  onNavigate,
  onLogout,
  storageKey = 'apex_admin_sidebar_collapsed',
}: AppAdminSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed

  const toggleCollapse = () => {
    const next = !isCollapsed
    if (onCollapsedChange) {
      onCollapsedChange(next)
    } else {
      setInternalCollapsed(next)
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, next ? 'true' : 'false')
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey)
      if (saved !== null) {
        const val = saved === 'true'
        if (onCollapsedChange) onCollapsedChange(val)
        else setInternalCollapsed(val)
      }
    }
  }, [storageKey, onCollapsedChange])

  // Filter navigation items by search
  const filteredGroups = searchQuery.trim()
    ? navGroups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((group) => group.items.length > 0)
    : navGroups

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => onMobileOpenChange?.(false)}
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200/80 dark:border-zinc-800 transition-all duration-300 ease-in-out select-none shadow-xl lg:shadow-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-14' : 'lg:w-56'} w-56`}
      >
        {/* Floating Expand Toggle Button (Collapsed) */}
        {isCollapsed && (
          <button
            type="button"
            onClick={toggleCollapse}
            title="ขยายแถบเมนู (Expand Sidebar)"
            className="hidden lg:flex absolute -right-2.5 top-3 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xs text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 items-center justify-center hover:scale-110 active:scale-95 transition z-30"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        )}

        {/* Tier 1: Header & Branding */}
        <div className="h-11 px-2.5 flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            <div className="w-6 h-6 shrink-0 rounded-md bg-gradient-to-br from-[#1C4D8D] to-[#0F2854] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              AX
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs tracking-tight text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                  {systemName}
                </span>
                <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  {systemTag}
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              type="button"
              onClick={toggleCollapse}
              className="hidden lg:flex w-5 h-5 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 items-center justify-center transition"
              title="พับเก็บแถบเมนู (Collapse)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tier 2: Search & Navigation */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
          {/* Search Input */}
          {!isCollapsed ? (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาเมนู... (⌘K)"
                className="w-full pl-6 pr-8 py-1 text-[10px] rounded-md bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 focus:bg-white dark:focus:bg-zinc-900 transition"
              />
              <Search className="w-3 h-3 absolute left-1.5 top-1.5 text-zinc-400" />
              <kbd className="absolute right-1 top-1 text-[8px] bg-white dark:bg-zinc-700 text-zinc-500 px-1 py-0.2 rounded border border-zinc-200 dark:border-zinc-600 font-mono">
                ⌘K
              </kbd>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={toggleCollapse}
                className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                title="ค้นหาเมนู (⌘K)"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Groups */}
          {filteredGroups.map((group) => (
            <div key={group.id} className="space-y-0.5">
              {!isCollapsed ? (
                <h4 className="px-2 pt-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {group.title}
                </h4>
              ) : (
                <div className="border-t border-zinc-100 dark:border-zinc-800 my-1 mx-0.5" />
              )}

              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={item.to || '#'}
                  onClick={(e) => {
                    e.preventDefault()
                    item.onClick?.()
                    onNavigate?.(item)
                    onMobileOpenChange?.(false)
                  }}
                  title={isCollapsed ? item.label : undefined}
                  className={`group flex items-center gap-2 px-2 py-1 rounded text-[11px] font-medium transition duration-150 relative ${
                    item.active
                      ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {item.icon && <span className="shrink-0 w-3.5 h-3.5 flex items-center justify-center">{item.icon}</span>}
                  {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
                  {!isCollapsed && item.badge && (
                    <span
                      className={`px-1 py-0.2 rounded text-[8px] font-bold shrink-0 ${
                        item.badgeColor === 'rose'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Tier 3: Minimalist System Footer (Option 3) */}
        <div className="px-2.5 py-2 border-t border-zinc-200/80 dark:border-zinc-800 shrink-0 text-zinc-400 dark:text-zinc-500 select-none">
          {!isCollapsed ? (
            <div className="flex items-center justify-between text-[9px]">
              <span className="font-medium truncate text-zinc-500 dark:text-zinc-400">{systemName}</span>
              <span className="font-mono text-zinc-400 dark:text-zinc-500">{systemTag}</span>
            </div>
          ) : (
            <div className="flex justify-center py-0.5 text-[8px] font-mono text-zinc-400" title={`${systemName} ${systemTag}`}>
              {systemTag.split(' ')[0] || 'v5'}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
