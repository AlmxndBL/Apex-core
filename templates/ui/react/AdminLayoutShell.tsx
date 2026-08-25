'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { Menu, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react'
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
  onSettings?: () => void
  onProfile?: () => void
  children: ReactNode
}

export function AdminLayoutShell({
  systemName = 'Apex Enterprise',
  systemTag = 'v5.0 Engine',
  navGroups,
  user = {
    name: 'สมชาย พัฒนากร',
    role: 'Super Administrator',
    email: 'somchai@enterprise.co.th',
    initials: 'SC',
  },
  pageTitle = 'แดชบอร์ดภาพรวม',
  breadcrumbs = [{ label: 'หน้าหลัก', href: '/' }, { label: 'ระบบจัดการ' }],
  headerActions,
  onNavigate,
  onLogout,
  onSettings,
  onProfile,
  children,
}: AdminLayoutShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

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

          {/* Right: Theme Toggler + Notifications + Custom Actions + User Menu Dropdown */}
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

            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

            {/* 👤 Top-Right User Menu Cluster */}
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1.5 pl-1 pr-1.5 py-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition text-left focus:outline-none"
                title="เมนูผู้ใช้งาน (User Account Menu)"
              >
                {/* Avatar Pill */}
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[9px] shadow-2xs shrink-0">
                  {user.initials || 'SC'}
                </div>
                {/* User Meta (Desktop) */}
                <div className="hidden md:flex flex-col min-w-0 pr-0.5 leading-tight">
                  <span className="text-[10px] font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-[85px]">
                    {user.name}
                  </span>
                  <span className="text-[8px] text-zinc-400 dark:text-zinc-500 truncate">
                    {user.role}
                  </span>
                </div>
                <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-150 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Popover */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-1 z-50 text-[11px] select-none divide-y divide-zinc-100 dark:divide-zinc-800 animate-in fade-in zoom-in-95 duration-100">
                  {/* Identity Header */}
                  <div className="px-2.5 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {user.initials || 'SC'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{user.name}</p>
                        <p className="text-[9px] text-zinc-400 truncate">{user.email || user.role}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[9px] font-bold">
                        <span className="w-1 h-1 rounded-full bg-blue-500" />
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-1 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false)
                        onProfile?.()
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition text-left"
                    >
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      <span>ข้อมูลส่วนตัว (Profile)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false)
                        onSettings?.()
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition text-left"
                    >
                      <Settings className="w-3.5 h-3.5 text-zinc-400" />
                      <span>ตั้งค่าบัญชี (Settings)</span>
                    </button>
                  </div>

                  {/* Destructive Action */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false)
                        onLogout?.()
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-medium transition text-left"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      <span>ออกจากระบบ (Log out)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
