'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Users, Plus, Search } from 'lucide-react'
import { DEMO_CUSTOMERS } from '@/lib/demo-data'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmptyState } from '@/components/shared/empty-state'
import { DesktopPageHeader } from '@/components/layout/top-nav'

export default function CustomersPage() {
  const t = useTranslations('customers')
  const [search, setSearch] = useState('')

  const filtered = DEMO_CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  )

  return (
    <div className="space-y-5">
      <DesktopPageHeader title={t('title')}>
        <Link href="/customers/new">
          <Button size="sm"><Plus className="w-4 h-4" />{t('new')}</Button>
        </Link>
      </DesktopPageHeader>

      <Input
        placeholder={t('searchPlaceholder')}
        value={search}
        onChange={e => setSearch(e.target.value)}
        leftIcon={<Search className="w-4 h-4" />}
      />

      {filtered.length === 0 ? (
        <EmptyState icon={Users} title={t('noCustomers')} description={t('noCustomersDesc')}
          actionLabel={t('new')} onAction={() => {}} />
      ) : (
        <div className="space-y-2">
          {filtered.map((customer, idx) => (
            <Link key={customer.id} href={`/customers/${customer.id}`}>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border-subtle))] hover:border-[hsl(var(--border))] transition-all duration-150 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">{customer.name}</p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">{customer.phone ?? 'No phone'}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-[hsl(var(--foreground-subtle))]">Since</p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">{formatDate(customer.createdAt)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="lg:hidden">
        <Link href="/customers/new">
          <Button className="w-full" size="lg"><Plus className="w-5 h-5" />{t('new')}</Button>
        </Link>
      </div>
    </div>
  )
}
