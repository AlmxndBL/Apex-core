import React, { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

export interface AppKpiCardProps {
  title: string
  value: string | number
  change?: string
  trendUp?: boolean
  subtitle?: string
  icon?: ReactNode
  className?: string
}

export function AppKpiCard({
  title,
  value,
  change,
  trendUp = true,
  subtitle,
  icon,
  className = '',
}: AppKpiCardProps) {
  return (
    <div
      className={`p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/90 shadow-2xs space-y-1 relative overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
        <span className="font-medium truncate">{title}</span>
        {icon && <span className="w-3 h-3 text-zinc-400 dark:text-zinc-500 shrink-0">{icon}</span>}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight font-mono">
          {value}
        </span>
        {change && (
          <span
            className={`text-[9px] font-bold px-1 py-0.2 rounded flex items-center gap-0.5 ${
              trendUp
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
            }`}
          >
            {trendUp ? <TrendingUp className="w-2 h-2" /> : <TrendingDown className="w-2 h-2" />}
            <span>{change}</span>
          </span>
        )}
      </div>
      {subtitle && <p className="text-[9px] text-zinc-400 dark:text-zinc-500 truncate">{subtitle}</p>}
    </div>
  )
}
