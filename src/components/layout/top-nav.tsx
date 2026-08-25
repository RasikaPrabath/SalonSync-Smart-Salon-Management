'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Scissors, LogOut } from 'lucide-react'
import { ThemeSwitcher } from './theme-switcher'
import { LanguageSwitcher } from './language-switcher'
import { cn } from '@/lib/utils'
import { signOut } from '@/lib/supabase'

const pathTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/appointments': 'Appointments',
  '/sales': 'Sales',
  '/expenses': 'Expenses',
  '/customers': 'Customers',
  '/inventory': 'Inventory',
  '/staff': 'Staff',
  '/reports': 'Reports',
  '/insights': 'Insights',
  '/settings': 'Settings',
}

export function TopNav() {
  const pathname = usePathname()
  
  const title = Object.entries(pathTitles).find(([key]) =>
    pathname === key || pathname.startsWith(key + '/')
  )?.[1] ?? 'SalonSync'

  return (
    <header className="lg:hidden sticky top-0 z-30 glass border-b border-[hsl(var(--sidebar-border))] h-14">
      <div className="flex items-center justify-between h-full px-4 gap-3">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
            <Scissors className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-[hsl(var(--foreground))] text-sm tracking-tight">
            Salon<span className="text-[hsl(var(--primary))]">Sync</span>
          </span>
        </Link>

        {/* Page title — centered */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-[hsl(var(--foreground))]">
          {title}
        </span>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <button 
            onClick={signOut}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--danger))]"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

export function DesktopPageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-page-title">{title}</h1>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}
