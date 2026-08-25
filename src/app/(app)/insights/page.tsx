import { Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function InsightsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-page-title">AI Insights</h1>
      <Card className="overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-[hsl(var(--primary))] via-purple-500 to-blue-500" />
        <CardContent className="py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-purple-500 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">AI-Powered Insights</h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] max-w-sm mx-auto mb-4">
            SalonSync will analyze your business data and generate plain-language monthly performance summaries — in Sinhala or English.
          </p>
          <p className="text-sm text-[hsl(var(--foreground-subtle))] max-w-xs mx-auto mb-6">
            සිංහල හෝ ඉංග්‍රීසියෙන් AI-ශක්තිමත් අවබෝධය ඉදිරියේ දී.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[hsl(var(--primary-muted))] to-purple-500/10 text-[hsl(var(--primary))] text-xs font-medium border border-[hsl(var(--primary)/0.2)]">
            <Sparkles className="w-3 h-3" /> Coming in Phase 3
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
