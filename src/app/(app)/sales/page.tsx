'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ShoppingBag, Plus, Filter } from 'lucide-react'
import { DEMO_SALES } from '@/lib/demo-data'
import { formatCurrency, formatDate, getPaymentMethodLabel } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/shared/empty-state'
import { DesktopPageHeader } from '@/components/layout/top-nav'

const paymentFilters = ['all', 'cash', 'card', 'bank_transfer', 'other'] as const

export default function SalesPage() {
  const t = useTranslations('sales')
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all'
    ? DEMO_SALES
    : DEMO_SALES.filter(s => s.paymentMethod === filter)

  const totalToday = DEMO_SALES
    .filter(s => {
      const d = new Date(s.createdAt)
      const today = new Date()
      return d.toDateString() === today.toDateString()
    })
    .reduce((sum, s) => sum + s.amount, 0)

  const paymentVariant: Record<string, 'success' | 'info' | 'warning' | 'neutral'> = {
    cash: 'success',
    card: 'info',
    bank_transfer: 'warning',
    other: 'neutral',
  }

  return (
    <div className="space-y-5">
      <DesktopPageHeader title={t('title')}>
        <Link href="/sales/new">
          <Button size="sm">
            <Plus className="w-4 h-4" />
            {t('new')}
          </Button>
        </Link>
      </DesktopPageHeader>

      {/* Summary */}
      <div className="p-4 rounded-xl bg-[hsl(var(--success-bg))] border border-[hsl(var(--success)/0.2)]">
        <p className="text-xs text-[hsl(var(--foreground-muted))]">{t('totalToday')}</p>
        <p className="text-2xl font-bold font-tabular text-[hsl(var(--success-foreground))]">
          {formatCurrency(totalToday || 24500)}
        </p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {paymentFilters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
              filter === f
                ? 'bg-[hsl(var(--primary))] text-white'
                : 'bg-[hsl(var(--background-3))] text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            {f === 'all' ? 'All' : getPaymentMethodLabel(f)}
          </button>
        ))}
      </div>

      {/* Sales list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title={t('noSales')}
          description={t('noSalesDesc')}
          actionLabel={t('new')}
          onAction={() => {}}
        />
      ) : (
        <div className="space-y-2">
          {filtered.slice(0, 30).map(sale => (
            <div
              key={sale.id}
              className="flex items-center justify-between p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border-subtle))] hover:border-[hsl(var(--border))] transition-all duration-150"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--success-bg))] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 text-[hsl(var(--success-foreground))]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                    {sale.note || (sale.customer?.name ?? 'Walk-in sale')}
                  </p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">
                    {sale.customer?.name && sale.note ? sale.customer.name + ' · ' : ''}
                    {formatDate(sale.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={paymentVariant[sale.paymentMethod] ?? 'neutral'}>
                  {getPaymentMethodLabel(sale.paymentMethod)}
                </Badge>
                <span className="text-sm font-bold font-tabular text-[hsl(var(--foreground))]">
                  {formatCurrency(sale.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile FAB */}
      <div className="lg:hidden">
        <Link href="/sales/new">
          <Button className="w-full" size="lg">
            <Plus className="w-5 h-5" />
            {t('new')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
