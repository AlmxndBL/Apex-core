import React, { ReactNode } from 'react'
import { AlertTriangle, FolderOpen, RefreshCw } from 'lucide-react'

export interface App4StateContainerProps {
  status: 'loading' | 'empty' | 'error' | 'ready'
  loadingSlot?: ReactNode
  emptyMessage?: string
  emptyActionLabel?: string
  onEmptyAction?: () => void
  errorMessage?: string
  errorSubtext?: string
  onRetry?: () => void
  children: ReactNode
}

export function App4StateContainer({
  status,
  loadingSlot,
  emptyMessage = 'ยังไม่มีข้อมูลในระบบ',
  emptyActionLabel = '+ สร้างรายการแรก',
  onEmptyAction,
  errorMessage = 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้',
  errorSubtext = 'เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง',
  onRetry,
  children,
}: App4StateContainerProps) {
  // 1. Loading Skeleton State
  if (status === 'loading') {
    return (
      loadingSlot || (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 space-y-2 animate-pulse">
          <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
          <div className="space-y-1.5 pt-1">
            <div className="h-6 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
            <div className="h-6 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
            <div className="h-6 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
          </div>
        </div>
      )
    )
  }

  // 2. Error Recovery State
  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-rose-200 bg-rose-50/50 p-6 text-center dark:border-rose-900/50 dark:bg-rose-950/20">
        <div className="rounded-full bg-rose-100 p-2 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400 mb-2">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h3 className="text-xs font-semibold text-rose-900 dark:text-rose-200">{errorMessage}</h3>
        <p className="mt-0.5 text-[10px] text-rose-600 dark:text-rose-400 max-w-sm">{errorSubtext}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2.5 inline-flex items-center gap-1 rounded bg-rose-600 px-2.5 py-1 text-[10px] font-semibold text-white transition hover:bg-rose-700 active:scale-95 shadow-2xs"
          >
            <RefreshCw className="w-3 h-3" />
            <span>ลองใหม่อีกครั้ง (Retry)</span>
          </button>
        )}
      </div>
    )
  }

  // 3. Empty State
  if (status === 'empty') {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-8 text-center">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-2">
          <FolderOpen className="w-4 h-4" />
        </div>
        <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{emptyMessage}</h3>
        {onEmptyAction && (
          <button
            type="button"
            onClick={onEmptyAction}
            className="mt-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-[10px] font-semibold shadow-2xs active:scale-95 transition"
          >
            {emptyActionLabel}
          </button>
        )}
      </div>
    )
  }

  // 4. Ready State
  return <>{children}</>
}
