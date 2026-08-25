'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { TrendingDown, Plus } from 'lucide-react'
import { DEMO_EXPENSES } from '@/lib/demo-data'
import { formatCurrency, formatDate, getExpenseCategoryLabel } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/empty-state'
import { DesktopPageHeader } from '@/components/layout/top-nav'

const categoryVariants: Record<string, 'danger' | 'warning' | 'info' | 'neutral' | 'primary'> = {
  rent: 'danger',
  salary: 'warning',
  supplies: 'info',
  utilities: 'info',
  equipment: 'primary',
  marketing: 'neutral',
  other: 'neutral',
}

export default function ExpensesPage() {
  const t = useTranslations('expenses')
  const [filter, setFilter] = useState('all')

  const categories = ['all', 'supplies', 'utilities', 'rent', 'salary', 'equipment', 'marketing', 'other']

  const filtered = filter === 'all'
    ? DEMO_EXPENSES
    : DEMO_EXPENSES.filter(e => e.category === filter)

  const totalThisMonth = DEMO_EXPENSES.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-5">
      <DesktopPageHeader title={t('title')}>
        <Link href="/expenses/new">
          <Button size="sm">
            <Plus className="w-4 h-4" />
            {t('new')}
          </Button>
        </Link>
      </DesktopPageHeader>

      {/* Summary */}
      <div className="p-4 rounded-xl bg-[hsl(var(--danger-bg))] border border-[hsl(var(--danger)/0.2)]">
        <p className="text-xs text-[hsl(var(--foreground-muted))]">{t('totalThisMonth')}</p>
        <p className="text-2xl font-bold font-tabular text-[hsl(var(--danger-foreground))]">
          {formatCurrency(totalThisMonth)}
        </p>
      </div>

      {/* Category filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
              filter === cat
                ? 'bg-[hsl(var(--primary))] text-white'
                : 'bg-[hsl(var(--background-3))] text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            {cat === 'all' ? 'All' : getExpenseCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Expense list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={TrendingDown}
          title={t('noExpenses')}
          description={t('noExpensesDesc')}
          actionLabel={t('new')}
          onAction={() => {}}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map(expense => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border-subtle))] hover:border-[hsl(var(--border))] transition-all duration-150"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--danger-bg))] flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5 text-[hsl(var(--danger-foreground))]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                    {expense.note || getExpenseCategoryLabel(expense.category)}
                  </p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">
                    {formatDate(expense.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={categoryVariants[expense.category] ?? 'neutral'}>
                  {getExpenseCategoryLabel(expense.category)}
                </Badge>
                <span className="text-sm font-bold font-tabular text-[hsl(var(--danger-foreground))]">
                  {formatCurrency(expense.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="lg:hidden">
        <Link href="/expenses/new">
          <Button className="w-full" size="lg">
            <Plus className="w-5 h-5" />
            {t('new')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
