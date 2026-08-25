'use client'

import { useState } from 'react'
import {
  Sparkles, TrendingUp, TrendingDown, Users, CalendarDays,
  Lightbulb, AlertTriangle, ChevronRight, RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DesktopPageHeader } from '@/components/layout/top-nav'
import { DEMO_SALES, DEMO_EXPENSES, DEMO_APPOINTMENTS, DEMO_CUSTOMERS } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ===================================================================
// Mock AI-generated insight blocks
// ===================================================================

const insightsSI = {
  summary: 'ඔබේ ව්‍යාපාරය මෙම මාසයේ ශක්තිමත් ලෙස ක්‍රියාත්මක විය. මිළ ගණන් ඉහළ ගිය නිසා ලාභය 18% කින් ඉහළ ගොස් ඇත.',
  highlights: [
    { icon: TrendingUp, type: 'positive', title: 'ආදායම ඉහළ ගොස් ඇත', detail: 'ජූලි මාසයට සාපේක්ෂව 18% වැඩිවීමක් දකිනු ලැබේ.' },
    { icon: Users, type: 'positive', title: 'නව ගනුදෙනුකරුවන් 4 දෙනෙකු', detail: 'මෙම මාසයේ 4 දෙනෙකු නව ගනුදෙනුකරුවන් ලෙස ලියාපදිංචි විය.' },
    { icon: CalendarDays, type: 'warning', title: 'No-Show 2ක්', detail: 'ඔබේ Appointment 2ක් No-Show විය. WhatsApp reminder ක්‍රමය උත්සාහ කරන්න.' },
    { icon: TrendingDown, type: 'negative', title: 'Supply cost ඉහළ ගොස් ඇත', detail: 'Supplies වියදම 12% කින් ඉහළ ගොස් ඇත. ගොඩ ගෙනයාම (bulk buying) සලකා බලන්න.' },
  ],
  tips: [
    'Appointment reminder — සෑම booking එකකටම 1  දිනකට පෙර WhatsApp message කරන්න.',
    'No-show ලෙස ලකුණු කළ ගනුදෙනුකරුවන්ට විශේෂ offer කරන්න.',
    'Razor Blades හා Beard Oil stock ශේෂ — ඉක්මනින් order කරන්න.',
    'Haircut service ඔබේ ඉහළම revenue source — ඒ price review කරන්න.',
  ],
}

const insightsEN = {
  summary: 'Your business had a strong month. Revenue grew 18% vs last month, driven by higher appointment volume and a small price increase on haircuts.',
  highlights: [
    { icon: TrendingUp, type: 'positive', title: 'Revenue Up 18%', detail: 'Compared to July, August revenue increased by 18%.' },
    { icon: Users, type: 'positive', title: '4 New Customers', detail: '4 new customers registered this month — retention is key now.' },
    { icon: CalendarDays, type: 'warning', title: '2 No-Shows', detail: '2 appointments were no-shows. Try WhatsApp reminders 1 day before.' },
    { icon: TrendingDown, type: 'negative', title: 'Supply Costs Up', detail: 'Supplies cost rose 12%. Consider bulk buying to reduce per-unit cost.' },
  ],
  tips: [
    'Send WhatsApp reminders 1 day before every appointment to reduce no-shows.',
    'Offer a small discount to customers who no-showed to bring them back.',
    'Razor Blades and Beard Oil are critically low — reorder today.',
    'Haircut is your highest revenue service — review pricing.',
  ],
}

type Lang = 'en' | 'si'

function InsightCard({
  icon: Icon,
  type,
  title,
  detail,
}: {
  icon: React.ElementType
  type: string
  title: string
  detail: string
}) {
  const styles = {
    positive: {
      bg: 'bg-[hsl(var(--success-bg))] border-[hsl(var(--success)/0.2)]',
      icon: 'text-[hsl(var(--success-foreground))]',
      badge: 'success' as const,
      label: 'Positive',
    },
    warning: {
      bg: 'bg-[hsl(var(--warning-bg))] border-[hsl(var(--warning)/0.2)]',
      icon: 'text-[hsl(var(--warning-foreground))]',
      badge: 'warning' as const,
      label: 'Attention',
    },
    negative: {
      bg: 'bg-[hsl(var(--danger-bg))] border-[hsl(var(--danger)/0.2)]',
      icon: 'text-[hsl(var(--danger-foreground))]',
      badge: 'danger' as const,
      label: 'Watch',
    },
  }[type] ?? {
    bg: 'bg-[hsl(var(--background-3))] border-[hsl(var(--border))]',
    icon: 'text-[hsl(var(--foreground-muted))]',
    badge: 'neutral' as const,
    label: 'Info',
  }

  return (
    <div className={cn('flex items-start gap-3 p-4 rounded-xl border', styles.bg)}>
      <div className={cn('shrink-0 mt-0.5', styles.icon)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{title}</p>
          <Badge variant={styles.badge}>{styles.label}</Badge>
        </div>
        <p className="text-xs text-[hsl(var(--foreground-muted))] leading-relaxed">{detail}</p>
      </div>
    </div>
  )
}

export default function InsightsPage() {
  const [lang, setLang] = useState<Lang>('si')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(true)

  const insights = lang === 'si' ? insightsSI : insightsEN

  // Real stats from demo data
  const totalRevenue = DEMO_SALES.reduce((s, x) => s + x.amount, 0)
  const totalExpenses = DEMO_EXPENSES.reduce((s, x) => s + x.amount, 0)
  const profit = totalRevenue - totalExpenses
  const totalAppointments = DEMO_APPOINTMENTS.length

  const handleRegenerate = async () => {
    setLoading(true)
    setGenerated(false)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setGenerated(true)
  }

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="AI Insights">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[hsl(var(--background-3))] rounded-lg p-0.5 gap-0.5">
            {(['si', 'en'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-semibold transition-all',
                  lang === l
                    ? 'bg-[hsl(var(--primary))] text-white shadow-sm'
                    : 'text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]'
                )}
              >
                {l === 'si' ? 'සිං' : 'EN'}
              </button>
            ))}
          </div>
          <Button size="sm" variant="secondary" onClick={handleRegenerate} loading={loading}>
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </Button>
        </div>
      </DesktopPageHeader>

      {/* AI Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(16_55%_35%)] to-purple-700 p-6 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold text-white/80">
              {lang === 'si' ? 'AI විශ්ලේෂණය — අගෝස්තු 2026' : 'AI Analysis — August 2026'}
            </span>
          </div>
          <p className="text-base leading-relaxed text-white/90 font-medium max-w-lg">
            {loading ? (
              <span className="animate-pulse">
                {lang === 'si' ? 'AI විශ්ලේෂණය සකස් කරමින්...' : 'Generating AI analysis...'}
              </span>
            ) : insights.summary}
          </p>
        </div>
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute right-4 -bottom-8 w-20 h-20 rounded-full bg-white/8" />
        <Sparkles className="absolute right-8 bottom-6 w-12 h-12 text-white/10" />
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: lang === 'si' ? 'ආදායම' : 'Revenue', value: formatCurrency(totalRevenue), color: 'success' },
          { label: lang === 'si' ? 'වියදම' : 'Expenses', value: formatCurrency(totalExpenses), color: 'danger' },
          { label: lang === 'si' ? 'ලාභය' : 'Profit', value: formatCurrency(profit), color: 'primary' },
          { label: lang === 'si' ? 'හමුවීම්' : 'Appts', value: totalAppointments.toString(), color: 'info' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="p-3 text-center">
            <p className={`text-sm font-bold font-tabular text-[hsl(var(--${color}-foreground))]`}>{value}</p>
            <p className="text-[10px] text-[hsl(var(--foreground-subtle))] mt-0.5 leading-tight">{label}</p>
          </Card>
        ))}
      </div>

      {/* Insight highlights */}
      {generated && (
        <>
          <div>
            <h2 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[hsl(var(--warning-foreground))]" />
              {lang === 'si' ? 'ප්‍රධාන ඉස්මතු කිරීම්' : 'Key Highlights'}
            </h2>
            <div className="space-y-2">
              {insights.highlights.map((h, i) => (
                <InsightCard key={i} {...h} />
              ))}
            </div>
          </div>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <ChevronRight className="w-4 h-4 text-[hsl(var(--primary))]" />
                {lang === 'si' ? 'AI ඉඟි' : 'AI Tips for Next Month'}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-3">
              {insights.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[hsl(var(--primary))] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-[hsl(var(--foreground-muted))] leading-relaxed">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Gemini powered badge */}
          <div className="flex items-center justify-center gap-2 py-2">
            <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--foreground-subtle))]" />
            <p className="text-xs text-[hsl(var(--foreground-subtle))]">
              {lang === 'si'
                ? 'Gemini AI මගින් ජනනය කෙරිණි · ඔබේ ව්‍යාපාර දත්ත මත පදනම්ව'
                : 'Generated by Gemini AI · Based on your business data'}
            </p>
          </div>
        </>
      )}

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-20 rounded-xl skeleton" />
          ))}
        </div>
      )}
    </div>
  )
}
