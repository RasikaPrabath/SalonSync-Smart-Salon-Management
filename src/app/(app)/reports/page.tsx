import { BarChart3, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function ReportsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-page-title">Reports</h1>
      <Card>
        <CardContent className="py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary-muted))] flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-[hsl(var(--primary))]" />
          </div>
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Detailed Reports</h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] max-w-xs mx-auto mb-4">
            Daily, weekly, and monthly P&L charts. Deep financial reporting. Coming in Phase 2.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(var(--primary-muted))] text-[hsl(var(--primary))] text-xs font-medium">
            <Zap className="w-3 h-3" /> Phase 2
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
