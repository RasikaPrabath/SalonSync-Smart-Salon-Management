'use client'

import { useTransition, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'si', label: 'සි' },
] as const

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()
  const [currentLocale, setCurrentLocale] = useState<string>('si')

  useEffect(() => {
    const match = document.cookie.match(/locale=([^;]+)/)
    setCurrentLocale(match?.[1] ?? 'si')
  }, [])

  const switchLocale = (locale: string) => {
    startTransition(() => {
      document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`
      setCurrentLocale(locale)
      window.location.reload()
    })
  }

  return (
    <div className="flex items-center bg-[hsl(var(--background-3))] rounded-lg p-0.5 gap-0.5">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          disabled={isPending}
          className={cn(
            'px-2 py-1 rounded-md text-xs font-medium transition-all duration-150',
            currentLocale === code
              ? 'bg-[hsl(var(--primary))] text-white shadow-sm'
              : 'text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]'
          )}
          aria-label={`Switch to ${code === 'en' ? 'English' : 'Sinhala'}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
