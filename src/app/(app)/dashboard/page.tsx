'use client'

import { useTranslations } from 'next-intl'
import { TrendingUp, TrendingDown, CalendarDays, DollarSign, ArrowRight, AlertTriangle, UserX, Clock, Package } from 'lucide-react'
import Link from 'next/link'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { getDemoDashboardMetrics, DEMO_SALON } from '@/lib/demo-data'
import { formatCurrency, formatTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DesktopPageHeader } from '@/components/layout/top-nav'

// Custom tooltip for the chart
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

export default function DashboardPage() {
  const t = useTranslations('dashboard')
  const metrics = getDemoDashboardMetrics()

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
          {t('greeting', { time: greeting, name: DEMO_SALON.name })}
        </p>
      </div>

      {/* Hero Card — Today's Profit */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(16_55%_38%)] p-6 text-white shadow-lg">
        <div className="relative z-10">
          <p className="text-sm font-medium text-white/70 mb-1">{t('todayProfit')}</p>
          <p className="text-hero font-tabular">
            {formatCurrency(metrics.todayProfit)}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <Badge
              variant={profitIsPositive ? 'success' : 'danger'}
              className="bg-white/15 text-white border-white/20"
            >
              {profitIsPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {profitIsPositive ? 'Profitable today' : 'Running a loss today'}
            </Badge>
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -right-2 -bottom-8 w-20 h-20 rounded-full bg-white/8" />
      </div>

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
            DEMO_SALON.name ? 285000 : 0
          )}
          icon={TrendingUp}
          variant="neutral"
          trend="net profit"
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
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: 'hsl(var(--foreground-subtle))' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => v.split(',')[0]}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: 'hsl(var(--foreground-subtle))' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(16 72% 56%)"
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(0 65% 56%)"
                  strokeWidth={2}
                  fill="url(#expenseGrad)"
                  dot={false}
                />
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
              {metrics.needsAttention.lowStockItems.slice(0, 3).map(product => (
                <Link key={product.id} href="/inventory">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--warning-bg))] border border-[hsl(var(--warning)/0.15)] hover:border-[hsl(var(--warning)/0.3)] transition-colors">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-[hsl(var(--warning-foreground))] shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[hsl(var(--foreground))]">{product.name}</p>
                        <p className="text-xs text-[hsl(var(--foreground-muted))]">
                          Only {product.stockQuantity} left — threshold: {product.lowStockThreshold}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[hsl(var(--warning-foreground))]">Low Stock</span>
                  </div>
                </Link>
              ))}

              {metrics.needsAttention.noShowFollowUps.map(apt => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--danger-bg))] border border-[hsl(var(--danger)/0.15)]"
                >
                  <div className="flex items-center gap-3">
                    <UserX className="w-4 h-4 text-[hsl(var(--danger-foreground))] shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {apt.customer?.name ?? 'Walk-in'}
                      </p>
                      <p className="text-xs text-[hsl(var(--foreground-muted))]">
                        {apt.serviceName} — No Show
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${apt.customer?.phone?.replace(/\D/g, '')}?text=Hi ${apt.customer?.name}, sorry to miss you! Would you like to reschedule your ${apt.serviceName}?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[hsl(var(--primary))] hover:underline font-medium"
                  >
                    WhatsApp
                  </a>
                </div>
              ))}

              {/* Upcoming appointments */}
              {metrics.needsAttention.upcomingAppointments.map(apt => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--background-3))] border border-[hsl(var(--border-subtle))]"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[hsl(var(--info-foreground))] shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {apt.customer?.name ?? 'Walk-in'}
                      </p>
                      <p className="text-xs text-[hsl(var(--foreground-muted))]">
                        {apt.serviceName} at {formatTime(apt.scheduledAt)}
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

      {/* Quick Actions (mobile FAB equivalent for desktop) */}
      <div className="lg:hidden flex gap-3">
        <Link href="/sales/new" className="flex-1">
          <Button className="w-full" size="lg">{t('addSale')}</Button>
        </Link>
        <Link href="/appointments/new" className="flex-1">
          <Button className="w-full" size="lg" variant="secondary">{t('addAppointment')}</Button>
        </Link>
      </div>
    </div>
  )
}
