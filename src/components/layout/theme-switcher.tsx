'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg skeleton" />
  }

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const

  const current = themes.find(t => t.value === theme) ?? themes[1]
  const Icon = current.icon

  const cycle = () => {
    const idx = themes.findIndex(t => t.value === theme)
    const next = themes[(idx + 1) % themes.length]
    setTheme(next.value)
  }

  return (
    <button
      onClick={cycle}
      title={`Theme: ${current.label}`}
      className={cn(
        'w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150',
        'hover:bg-[hsl(var(--background-3))] text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]'
      )}
      aria-label={`Switch theme (current: ${current.label})`}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}
