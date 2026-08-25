'use client'

import React, { useState, ReactNode } from 'react'
import { Menu, Bell } from 'lucide-react'
import { AppAdminSidebar, NavGroup, UserProfile, NavItem } from './AppAdminSidebar'
import { AnimatedThemeToggler } from './AnimatedThemeToggler'

export interface AdminLayoutShellProps {
  systemName?: string
  systemTag?: string
  navGroups: NavGroup[]
  user?: UserProfile
  pageTitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  headerActions?: ReactNode
  onNavigate?: (item: NavItem) => void
  onLogout?: () => void
  children: ReactNode
}

export function AdminLayoutShell({
  systemName = 'Apex Enterprise',
  systemTag = 'v5.0 Engine',
  navGroups,
  user,
  pageTitle = 'แดชบอร์ดภาพรวม',
  breadcrumbs = [{ label: 'หน้าหลัก', href: '/' }, { label: 'ระบบจัดการ' }],
  headerActions,
  onNavigate,
  onLogout,
  children,
}: AdminLayoutShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="h-screen flex flex-row overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* 1. Responsive Collapsible Sidebar */}
      <AppAdminSidebar
        systemName={systemName}
        systemTag={systemTag}
        navGroups={navGroups}
        user={user}
        isMobileOpen={isMobileOpen}
        onMobileOpenChange={setIsMobileOpen}
        isCollapsed={isCollapsed}
        onCollapsedChange={setIsCollapsed}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navbar Header (h-11 / 44px) */}
        <header className="h-11 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 px-3 flex items-center justify-between gap-2.5 shrink-0 z-30">
          {/* Left: Mobile Menu Toggle & Title */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-1 rounded text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title="Open Mobile Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 min-w-0">
              <nav className="hidden sm:flex items-center gap-1 text-[9px] font-medium text-zinc-400 dark:text-zinc-500 truncate">
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span>/</span>}
                    {crumb.href ? (
                      <a href={crumb.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                        {crumb.label}
                      </a>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                  </React.Fragment>
                ))}
                <span>/</span>
              </nav>
              <h1 className="text-xs font-bold text-zinc-900 dark:text-white tracking-tight truncate leading-tight">
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* Right: Theme Toggler + Notifications + Custom Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <AnimatedThemeToggler />

            <button
              type="button"
              className="relative p-1.5 rounded text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title="การแจ้งเตือน"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500 ring-1.5 ring-white dark:ring-zinc-900" />
            </button>

            {headerActions}
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2.5">
          {children}
        </main>
      </div>
    </div>
  )
}
