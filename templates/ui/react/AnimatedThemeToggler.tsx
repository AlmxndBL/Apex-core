'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export interface AnimatedThemeTogglerProps {
  className?: string
}

export function AnimatedThemeToggler({ className = '' }: AnimatedThemeTogglerProps) {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`relative flex items-center justify-center w-7 h-7 rounded border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 transition-colors focus:outline-none ${className}`}
      title="สลับโหมดมืด / สว่าง (Animated Theme Toggler)"
      aria-label="Toggle theme"
    >
      <Sun className="w-3.5 h-3.5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="w-3.5 h-3.5 absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-400" />
    </button>
  )
}
