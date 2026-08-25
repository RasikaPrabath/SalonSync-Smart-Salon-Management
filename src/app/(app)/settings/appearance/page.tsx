'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'

const themes = [
  { value: 'light', label: 'Light', icon: Sun, desc: 'Always light' },
  { value: 'dark', label: 'Dark', icon: Moon, desc: 'Always dark' },
  { value: 'system', label: 'System', icon: Monitor, desc: 'Follow device' },
] as const

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'si', label: 'Sinhala', native: 'සිංහල' },
] as const

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [selectedLang, setSelectedLang] = useState('si')
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    const match = document.cookie.match(/locale=([^;]+)/)
    if (match?.[1]) setSelectedLang(match[1])
  }, [])

  const saveLanguage = (code: string) => {
    setSelectedLang(code)
    document.cookie = `locale=${code}; path=/; max-age=31536000; SameSite=Lax`
    toast({ type: 'success', title: 'Language updated! Refreshing...' })
    setTimeout(() => window.location.reload(), 800)
  }

  if (!mounted) return null

  return (
    <div className="max-w-xl space-y-5">
      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {themes.map(({ value, label, icon: Icon, desc }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value)
                  toast({ type: 'success', title: `Theme set to ${label}` })
                }}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-150',
                  theme === value
                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary-muted))]'
                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--background-3))]'
                )}
              >
                <Icon className={cn('w-5 h-5', theme === value ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground-muted))]')} />
                <span className={cn('text-xs font-medium', theme === value ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground-muted))]')}>
                  {label}
                </span>
                <span className="text-[10px] text-[hsl(var(--foreground-subtle))]">{desc}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-4 h-4" /> Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {languages.map(({ code, label, native }) => (
              <button
                key={code}
                onClick={() => saveLanguage(code)}
                className={cn(
                  'flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-150',
                  selectedLang === code
                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary-muted))]'
                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--background-3))]'
                )}
              >
                <span className={cn('text-base font-bold', selectedLang === code ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground))]')}>
                  {native}
                </span>
                <span className="text-xs text-[hsl(var(--foreground-muted))]">{label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
