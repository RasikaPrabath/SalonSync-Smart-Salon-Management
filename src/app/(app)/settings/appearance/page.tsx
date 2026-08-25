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
    <div className="w-full space-y-6">
      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
          <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">
            Choose how SalonSync appears to you. Themes switch instantly.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map(({ value, label, icon: Icon, desc }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value)
                  toast({ type: 'success', title: `Theme set to ${label}` })
                }}
                className={cn(
                  'flex flex-col items-center text-center gap-2.5 p-5 rounded-xl border-2 transition-all duration-150 cursor-pointer',
                  theme === value
                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary-muted))] shadow-sm'
                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--background-3))]'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  theme === value ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--card))] text-[hsl(var(--foreground-muted))]'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className={cn('text-sm font-semibold block', theme === value ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground))]')}>
                    {label}
                  </span>
                  <span className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5 block">{desc}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[hsl(var(--primary))]" /> Language / භාෂාව
          </CardTitle>
          <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">
            Select your preferred interface language.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languages.map(({ code, label, native }) => (
              <button
                key={code}
                onClick={() => saveLanguage(code)}
                className={cn(
                  'flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-150 cursor-pointer text-left',
                  selectedLang === code
                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary-muted))] shadow-sm'
                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--background-3))]'
                )}
              >
                <div>
                  <span className={cn('text-lg font-bold block', selectedLang === code ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground))]')}>
                    {native}
                  </span>
                  <span className="text-xs text-[hsl(var(--foreground-muted))]">{label}</span>
                </div>
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  selectedLang === code ? 'border-[hsl(var(--primary))]' : 'border-[hsl(var(--border-strong))]'
                )}>
                  {selectedLang === code && <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--primary))]" />}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
