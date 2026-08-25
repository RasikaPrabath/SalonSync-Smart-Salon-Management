'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  LayoutDashboard,
  CalendarDays,
  ShoppingBag,
  TrendingDown,
  Users,
  Package,
  UserCog,
  BarChart3,
  Sparkles,
  Settings,
  Scissors,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from './theme-switcher'
import { LanguageSwitcher } from './language-switcher'
import { signOut } from '@/lib/supabase'

const navItems = [
  { key: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'appointments', href: '/appointments', icon: CalendarDays },
  { key: 'sales', href: '/sales', icon: ShoppingBag },
  { key: 'expenses', href: '/expenses', icon: TrendingDown },
  { key: 'customers', href: '/customers', icon: Users },
  { key: 'inventory', href: '/inventory', icon: Package },
  { key: 'staff', href: '/staff', icon: UserCog },
  { key: 'reports', href: '/reports', icon: BarChart3 },
  { key: 'insights', href: '/insights', icon: Sparkles },
  { key: 'settings', href: '/settings/profile', icon: Settings },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  return (
    <aside className="hidden lg:flex flex-col w-[220px] min-h-screen fixed left-0 top-0 z-40 border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-bg))]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-[hsl(var(--sidebar-border))] shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
          <Scissors className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-[hsl(var(--foreground))] text-lg tracking-tight">
          Salon<span className="text-[hsl(var(--primary))]">Sync</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-0.5">
          {navItems.map(({ key, href, icon: Icon }) => {
            const isActive = key === 'settings'
              ? pathname.startsWith('/settings')
              : pathname === href || pathname.startsWith(href + '/')

            return (
              <li key={key}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                    'hover:bg-[hsl(var(--background-3))] hover:text-[hsl(var(--foreground))]',
                    isActive
                      ? 'bg-[hsl(var(--sidebar-active-bg))] text-[hsl(var(--sidebar-active-text))]'
                      : 'text-[hsl(var(--foreground-muted))]'
                  )}
                >
                  <Icon className={cn('w-4 h-4 shrink-0', isActive && 'text-[hsl(var(--primary))]')} />
                  <span>{t(key as keyof typeof t)}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer — theme + language */}
      <div className="border-t border-[hsl(var(--sidebar-border))] p-3 flex items-center gap-2 shrink-0">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <div className="flex-1" />
        <button 
          onClick={signOut}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger-bg))] transition-colors"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  )
}
