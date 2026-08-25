'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Store, User, Palette, Users, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const settingsNav = [
  { key: 'profile', href: '/settings/profile', icon: Store, label: 'Salon Profile' },
  { key: 'appearance', href: '/settings/appearance', icon: Palette, label: 'Appearance' },
  { key: 'team', href: '/settings/team', icon: Users, label: 'Team' },
  { key: 'billing', href: '/settings/billing', icon: CreditCard, label: 'Billing' },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-page-title hidden lg:block">Settings</h1>
        <p className="text-sm text-[hsl(var(--foreground-muted))] mt-1 hidden lg:block">
          Manage your salon information, appearance preferences, team, and billing.
        </p>
      </div>

      {/* Settings nav tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 border-b border-[hsl(var(--border-subtle))]">
        {settingsNav.map(({ key, href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href)
          return (
            <Link
              key={key}
              href={href}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-xl shrink-0 transition-all duration-150 border-b-2 -mb-[1px]',
                isActive
                  ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))] bg-[hsl(var(--primary-muted))] font-semibold'
                  : 'border-transparent text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))]'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </div>

      {/* Content */}
      <div className="w-full">{children}</div>
    </div>
  )
}
