'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Sparkles, TrendingUp, TrendingDown, Users, CalendarDays,
  Lightbulb, ChevronRight, RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DesktopPageHeader } from '@/components/layout/top-nav'
import { formatCurrency, cn } from '@/lib/utils'
import { generateInsights } from '@/app/actions/generate-insights'

type Lang = 'en' | 'si'

function InsightCard({
  iconType,
  type,
  title,
  detail,
}: {
  iconType: string
  type: string
  title: string
  detail: string
}) {
  const Icon = {
    TrendingUp: TrendingUp,
    TrendingDown: TrendingDown,
    Users: Users,
    CalendarDays: CalendarDays
  }[iconType] || Lightbulb

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
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  const fetchData = useCallback(async (currentLang: Lang) => {
    setLoading(true)
    const result = await generateInsights(currentLang)
    setData(result)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData(lang)
  }, [lang, fetchData])

  const handleRegenerate = () => {
    fetchData(lang)
  }

  const profit = (data?.stats?.thisMonthRevenue || 0) - (data?.stats?.thisMonthExpenses || 0)

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="AI Insights">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[hsl(var(--background-3))] rounded-lg p-0.5 gap-0.5">
            {(['si', 'en'] as Lang[]).map(l => (
              <button
                key={l}
                disabled={loading}
                onClick={() => setLang(l)}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-semibold transition-all',
                  lang === l
                    ? 'bg-[hsl(var(--primary))] text-white shadow-sm'
                    : 'text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] disabled:opacity-50'
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
      <Card className="p-6 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-xs">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl bg-[hsl(var(--primary-muted))] flex items-center justify-center text-[hsl(var(--primary))]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-[hsl(var(--foreground))]">
            {lang === 'si' ? 'AI විශ්ලේෂණය — මෙම මාසය' : 'AI Analysis — This Month'}
          </span>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-[hsl(var(--foreground))] font-normal max-w-3xl">
          {loading ? (
            <span className="animate-pulse text-[hsl(var(--foreground-muted))]">
              {lang === 'si' ? 'AI විශ්ලේෂණය සකස් කරමින් (තත්පර කිහිපයක් ගතවනු ඇත)...' : 'Generating AI analysis (this may take a few seconds)...'}
            </span>
          ) : data?.insights?.summary || (lang === 'si' ? 'දත්ත ලබා ගැනීමට නොහැකි විය.' : 'Could not fetch data.')}
        </p>
      </Card>

      {/* Quick stats row */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: lang === 'si' ? 'ආදායම' : 'Revenue', value: formatCurrency(data?.stats?.thisMonthRevenue || 0), color: 'success' },
          { label: lang === 'si' ? 'වියදම' : 'Expenses', value: formatCurrency(data?.stats?.thisMonthExpenses || 0), color: 'danger' },
          { label: lang === 'si' ? 'ලාභය' : 'Profit', value: formatCurrency(profit), color: 'primary' },
          { label: lang === 'si' ? 'හමුවීම්' : 'Appts', value: (data?.stats?.thisMonthAppointments || 0).toString(), color: 'info' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="p-3 text-center border-none shadow-sm bg-[hsl(var(--card))]">
            {loading ? (
               <div className="h-5 w-16 bg-[hsl(var(--background-3))] rounded mx-auto mb-1 animate-pulse" />
            ) : (
               <p className={`text-sm font-bold font-tabular text-[hsl(var(--${color}-foreground))]`}>{value}</p>
            )}
            <p className="text-[10px] text-[hsl(var(--foreground-subtle))] mt-0.5 leading-tight">{label}</p>
          </Card>
        ))}
      </div>

      {/* Insight highlights */}
      {!loading && data?.insights?.highlights && (
        <>
          <div>
            <h2 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[hsl(var(--warning-foreground))]" />
              {lang === 'si' ? 'ප්‍රධාන ඉස්මතු කිරීම්' : 'Key Highlights'}
            </h2>
            <div className="space-y-2">
              {data.insights.highlights.map((h: any, i: number) => (
                <InsightCard key={i} iconType={h.icon} type={h.type} title={h.title} detail={h.detail} />
              ))}
            </div>
          </div>

          {/* Tips */}
          {data.insights.tips && data.insights.tips.length > 0 && (
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ChevronRight className="w-4 h-4 text-[hsl(var(--primary))]" />
                  {lang === 'si' ? 'AI ඉඟි' : 'AI Tips for Next Month'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 space-y-3">
                {data.insights.tips.map((tip: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[hsl(var(--primary))] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-[hsl(var(--foreground-muted))] leading-relaxed">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Gemini powered badge */}
          <div className="flex items-center justify-center gap-2 py-2">
            <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--foreground-subtle))]" />
            <p className="text-xs text-[hsl(var(--foreground-subtle))]">
              {lang === 'si'
                ? 'Gemini 3.6 AI මගින් ජනනය කෙරිණි · ඔබේ ව්‍යාපාර දත්ත මත පදනම්ව'
                : 'Generated by Gemini 3.6 AI · Based on your business data'}
            </p>
          </div>
        </>
      )}

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 rounded-xl bg-[hsl(var(--background-3))] animate-pulse" />
          ))}
        </div>
      )}
    </div>
  )
}
