'use client'

import { useTranslations } from 'next-intl'
import { TrendingUp, TrendingDown, CalendarDays, DollarSign, ArrowRight, AlertTriangle, UserX, Clock, Package } from 'lucide-react'
import Link from 'next/link'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { formatCurrency, formatTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DesktopPageHeader } from '@/components/layout/top-nav'

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[hsl(var(--popover))] border border-[hsl(var(--border))] rounded-xl p-3 shadow-xl">
      <p className="text-xs text-[hsl(var(--foreground-muted))] mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-[hsl(var(--foreground-muted))] capitalize">{entry.dataKey}:</span>
          <span className="font-semibold text-[hsl(var(--foreground))]">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  )
}

function MetricCard({
  label,
  value,
  icon: Icon,
  trend,
  variant = 'neutral',
}: {
  label: string
  value: string
  icon: React.ElementType
  trend?: string
  variant?: 'positive' | 'negative' | 'neutral' | 'info'
}) {
  const iconBg = {
    positive: 'bg-[hsl(var(--success-bg))] text-[hsl(var(--success-foreground))]',
    negative: 'bg-[hsl(var(--danger-bg))] text-[hsl(var(--danger-foreground))]',
    neutral: 'bg-[hsl(var(--primary-muted))] text-[hsl(var(--primary))]',
    info: 'bg-[hsl(var(--info-bg))] text-[hsl(var(--info-foreground))]',
  }[variant]

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-card-label truncate">{label}</p>
          <p className="text-xl font-bold text-[hsl(var(--foreground))] mt-1 font-tabular leading-none">
            {value}
          </p>
          {trend && (
            <p className="text-xs text-[hsl(var(--foreground-subtle))] mt-1">{trend}</p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ml-3 ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  )
}

export function DashboardClient({ metrics }: { metrics: any }) {
  const t = useTranslations('dashboard')
  
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  const profitIsPositive = metrics.todayProfit >= 0

  return (
    <div className="space-y-6">
      <DesktopPageHeader title={t('title')}>
        <Link href="/sales/new">
          <Button size="sm">{t('addSale')}</Button>
        </Link>
        <Link href="/appointments/new">
          <Button size="sm" variant="secondary">{t('addAppointment')}</Button>
        </Link>
      </DesktopPageHeader>

      {/* Greeting */}
      <div>
        <p className="text-[hsl(var(--foreground-muted))] text-sm">
          {t('greeting', { time: greeting, name: 'SalonSync' })}
        </p>
      </div>

      {/* Hero Card — Today's Profit */}
      <Card className="p-5 lg:p-6 bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground-muted))]">
                {t('todayProfit')}
              </span>
              <Badge
                variant={profitIsPositive ? 'success' : 'danger'}
                className="text-[11px] font-medium"
              >
                {profitIsPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {profitIsPositive ? 'Profitable today' : 'Running a loss today'}
              </Badge>
            </div>
            <p className="text-3xl lg:text-4xl font-extrabold font-tabular text-[hsl(var(--foreground))] tracking-tight">
              {formatCurrency(metrics.todayProfit)}
            </p>
          </div>

          {/* Quick breakdown metrics pills */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="px-3.5 py-2 rounded-xl bg-[hsl(var(--background-3))] border border-[hsl(var(--border-subtle))]">
              <p className="text-[10px] text-[hsl(var(--foreground-muted))] uppercase font-semibold">Revenue</p>
              <p className="text-sm font-bold text-[hsl(var(--foreground))] font-tabular">
                {formatCurrency(metrics.todayRevenue)}
              </p>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[hsl(var(--background-3))] border border-[hsl(var(--border-subtle))]">
              <p className="text-[10px] text-[hsl(var(--foreground-muted))] uppercase font-semibold">Expenses</p>
              <p className="text-sm font-bold text-[hsl(var(--foreground))] font-tabular">
                {formatCurrency(metrics.todayExpenses)}
              </p>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[hsl(var(--background-3))] border border-[hsl(var(--border-subtle))]">
              <p className="text-[10px] text-[hsl(var(--foreground-muted))] uppercase font-semibold">Margin</p>
              <p className="text-sm font-bold text-[hsl(var(--success-foreground))] font-tabular">
                {metrics.todayRevenue > 0
                  ? `${Math.round((metrics.todayProfit / metrics.todayRevenue) * 100)}%`
                  : '0%'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label={t('todayRevenue')}
          value={formatCurrency(metrics.todayRevenue)}
          icon={DollarSign}
          variant="positive"
          trend="from sales"
        />
        <MetricCard
          label={t('todayExpenses')}
          value={formatCurrency(metrics.todayExpenses)}
          icon={TrendingDown}
          variant="negative"
          trend="spent today"
        />
        <MetricCard
          label={t('todayAppointments')}
          value={metrics.todayAppointments.toString()}
          icon={CalendarDays}
          variant="info"
          trend="booked today"
        />
        <MetricCard
          label="This Month"
          value={formatCurrency(
            metrics.weeklyTrend.reduce((s: number, d: any) => s + d.revenue, 0)
          )}
          icon={TrendingUp}
          variant="neutral"
          trend="7-day revenue"
        />
      </div>

      {/* 7-Day Trend Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('weeklyTrend')}</CardTitle>
            <Link href="/reports" className="text-xs text-[hsl(var(--primary))] hover:underline flex items-center gap-1">
              {t('viewAll')} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.weeklyTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(16 72% 56%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(16 72% 56%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0 65% 56%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0 65% 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--foreground-subtle))' }}
                  tickLine={false} axisLine={false} tickFormatter={(v) => v.split(',')[0]} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--foreground-subtle))' }} tickLine={false} axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(16 72% 56%)" strokeWidth={2} fill="url(#revenueGrad)" dot={false} />
                <Area type="monotone" dataKey="expenses" stroke="hsl(0 65% 56%)" strokeWidth={2} fill="url(#expenseGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded bg-[hsl(16_72%_56%)]" />
              <span className="text-xs text-[hsl(var(--foreground-muted))]">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded bg-[hsl(0_65%_56%)]" />
              <span className="text-xs text-[hsl(var(--foreground-muted))]">Expenses</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Needs Attention */}
      {(metrics.needsAttention.noShowFollowUps.length > 0 || metrics.needsAttention.upcomingAppointments.length > 0 || metrics.needsAttention.lowStockItems.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[hsl(var(--warning-foreground))]" />
              {t('needsAttention')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="space-y-2">
              {/* Low stock items */}
              {metrics.needsAttention.lowStockItems.slice(0, 3).map((product: any) => (
                <Link key={product.id} href="/inventory">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--warning-bg))] border border-[hsl(var(--warning)/0.15)] hover:border-[hsl(var(--warning)/0.3)] transition-colors">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-[hsl(var(--warning-foreground))] shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[hsl(var(--foreground))]">{product.name}</p>
                        <p className="text-xs text-[hsl(var(--foreground-muted))]">
                          Only {product.stock} left — threshold: {product.min_stock}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[hsl(var(--warning-foreground))]">Low Stock</span>
                  </div>
                </Link>
              ))}

              {metrics.needsAttention.noShowFollowUps.map((apt: any) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--danger-bg))] border border-[hsl(var(--danger)/0.15)]">
                  <div className="flex items-center gap-3">
                    <UserX className="w-4 h-4 text-[hsl(var(--danger-foreground))] shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {apt.customer_name ?? 'Walk-in'}
                      </p>
                      <p className="text-xs text-[hsl(var(--foreground-muted))]">
                        {apt.service} — No Show
                      </p>
                    </div>
                  </div>
                  <a href={`https://wa.me/?text=Hi ${apt.customer_name}, sorry to miss you! Would you like to reschedule your ${apt.service}?`} target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(var(--primary))] hover:underline font-medium">
                    WhatsApp
                  </a>
                </div>
              ))}

              {/* Upcoming appointments */}
              {metrics.needsAttention.upcomingAppointments.map((apt: any) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--background-3))] border border-[hsl(var(--border-subtle))]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[hsl(var(--info-foreground))] shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {apt.customer_name ?? 'Walk-in'}
                      </p>
                      <p className="text-xs text-[hsl(var(--foreground-muted))]">
                        {apt.service} at {apt.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant="info">Booked</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
