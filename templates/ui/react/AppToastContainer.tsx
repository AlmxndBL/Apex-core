'use client'

import React from 'react'
import { useToast } from './useToast'

export function AppToastContainer() {
  const { toasts, remove } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => {
        const typeStyles =
          t.type === 'success'
            ? 'bg-white/95 border-emerald-200 text-slate-800 shadow-emerald-500/10'
            : t.type === 'error'
            ? 'bg-white/95 border-rose-200 text-slate-800 shadow-rose-500/10'
            : t.type === 'warning'
            ? 'bg-white/95 border-amber-200 text-slate-800 shadow-amber-500/10'
            : 'bg-white/95 border-blue-200 text-slate-800 shadow-blue-500/10'

        return (
          <div
            key={t.id}
            className={pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 transition-all backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 }
          >
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-bold text-slate-900 leading-snug">{t.title}</p>
              {t.message && (
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{t.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="text-slate-400 hover:text-slate-600 p-1 text-xs"
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}
