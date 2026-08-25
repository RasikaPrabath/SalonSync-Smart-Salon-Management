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
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const tabItems = [
  { key: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'appointments', href: '/appointments', icon: CalendarDays },
  { key: 'sales', href: '/sales', icon: ShoppingBag },
  { key: 'expenses', href: '/expenses', icon: TrendingDown },
  { key: 'customers', href: '/customers', icon: Users },
  { key: 'settings', href: '/settings/profile', icon: Settings },
] as const

export function BottomTabBar() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-[hsl(var(--sidebar-border))]">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {tabItems.map(({ key, href, icon: Icon }) => {
          const isActive = key === 'settings'
            ? pathname.startsWith('/settings')
            : pathname === href || pathname.startsWith(href + '/')

          return (
            <Link
              key={key}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl min-w-[44px] min-h-[44px] transition-all duration-150',
                isActive
                  ? 'text-[hsl(var(--primary))]'
                  : 'text-[hsl(var(--foreground-subtle))]'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'text-[hsl(var(--primary))]')} />
              <span className="text-[10px] font-medium leading-none">{t(key as keyof typeof t)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
