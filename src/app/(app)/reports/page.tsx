'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react'
import { DEMO_SALES, DEMO_EXPENSES, DEMO_APPOINTMENTS } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DesktopPageHeader } from '@/components/layout/top-nav'

type Range = '7d' | '30d' | '90d'

function buildDailyData(days: number) {
  const data = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

    const revenue = DEMO_SALES
      .filter(s => new Date(s.createdAt).toDateString() === date.toDateString())
      .reduce((sum, s) => sum + s.amount, 0) || Math.floor(Math.random() * 18000 + 8000)

    const expenses = DEMO_EXPENSES
      .filter(e => new Date(e.createdAt).toDateString() === date.toDateString())
      .reduce((sum, e) => sum + e.amount, 0) || Math.floor(Math.random() * 6000 + 2000)

    data.push({ date: dateStr, revenue, expenses, profit: revenue - expenses })
  }
  return data
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[hsl(var(--popover))] border border-[hsl(var(--border))] rounded-xl p-3 shadow-xl min-w-[160px]">
      <p className="text-xs text-[hsl(var(--foreground-muted))] mb-2 font-medium">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-xs mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-[hsl(var(--foreground-muted))] capitalize">{entry.dataKey}</span>
          </div>
          <span className="font-bold text-[hsl(var(--foreground))]">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  )
}

const PIE_COLORS = ['hsl(16 72% 56%)', 'hsl(0 65% 56%)', 'hsl(43 96% 56%)', 'hsl(200 72% 56%)', 'hsl(270 60% 60%)']

export default function ReportsPage() {
  const [range, setRange] = useState<Range>('30d')

  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90
  const data = buildDailyData(days)

  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0)
  const totalExpenses = data.reduce((s, d) => s + d.expenses, 0)
  const totalProfit = totalRevenue - totalExpenses
  const profitMargin = totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0

  // Expense breakdown by category
  const expenseByCategory = [
    { name: 'Supplies', value: 42000 },
    { name: 'Salary', value: 75000 },
    { name: 'Utilities', value: 18000 },
    { name: 'Rent', value: 35000 },
    { name: 'Other', value: 12000 },
  ]

  // Service revenue breakdown
  const serviceRevenue = [
    { service: 'Haircut', revenue: 185000 },
    { service: 'Shave', revenue: 62000 },
    { service: 'Color', revenue: 94000 },
    { service: 'Trim', revenue: 28000 },
    { service: 'Wash', revenue: 41000 },
  ]

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="Reports" />

      {/* Range selector */}
      <div className="flex gap-2">
        {(['7d', '30d', '90d'] as Range[]).map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              range === r
                ? 'bg-[hsl(var(--primary))] text-white shadow-sm'
                : 'bg-[hsl(var(--background-3))] text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '90 Days'}
          </button>
        ))}
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: TrendingUp, color: 'success' },
          { label: 'Total Expenses', value: formatCurrency(totalExpenses), icon: TrendingDown, color: 'danger' },
          { label: 'Net Profit', value: formatCurrency(totalProfit), icon: DollarSign, color: 'primary' },
          { label: 'Profit Margin', value: `${profitMargin}%`, icon: Calendar, color: 'info' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-card-label">{label}</p>
                <p className={`text-xl font-bold font-tabular mt-1 text-[hsl(var(--${color}-foreground))]`}>{value}</p>
              </div>
              <div className={`w-9 h-9 rounded-lg bg-[hsl(var(--${color}-bg))] flex items-center justify-center`}>
                <Icon className={`w-4 h-4 text-[hsl(var(--${color}-foreground))]`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* P&L Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(16 72% 56%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(16 72% 56%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0 65% 56%)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(0 65% 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: 'hsl(var(--foreground-subtle))' }}
                  tickLine={false} axisLine={false}
                  interval={days === 7 ? 0 : days === 30 ? 4 : 9}
                />
                <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--foreground-subtle))' }} tickLine={false} axisLine={false}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(16 72% 56%)" strokeWidth={2} fill="url(#revGrad)" dot={false} />
                <Area type="monotone" dataKey="expenses" stroke="hsl(0 65% 56%)" strokeWidth={2} fill="url(#expGrad)" dot={false} />
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

      {/* Profit bar chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Profit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.slice(-14)} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: 'hsl(var(--foreground-subtle))' }}
                  tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--foreground-subtle))' }} tickLine={false} axisLine={false}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="profit" radius={[4, 4, 0, 0]}
                  fill="hsl(16 72% 56%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two-column charts on desktop */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Expense breakdown pie */}
        <Card>
          <CardHeader><CardTitle>Expense Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenseByCategory} dataKey="value" nameKey="name"
                    cx="50%" cy="50%" innerRadius={40} outerRadius={70}
                    paddingAngle={3}
                  >
                    {expenseByCategory.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-2">
              {expenseByCategory.map((e, i) => (
                <div key={e.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-xs text-[hsl(var(--foreground-muted))]">{e.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top services */}
        <Card>
          <CardHeader><CardTitle>Revenue by Service</CardTitle></CardHeader>
          <CardContent>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceRevenue} layout="vertical" margin={{ top: 4, right: 4, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 9, fill: 'hsl(var(--foreground-subtle))' }}
                    tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="service" tick={{ fontSize: 10, fill: 'hsl(var(--foreground-muted))' }}
                    tickLine={false} axisLine={false} width={50} />
                  <Tooltip formatter={(v: any) => formatCurrency(v)} />
                  <Bar dataKey="revenue" radius={[0, 4, 4, 0]} fill="hsl(16 72% 56%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
