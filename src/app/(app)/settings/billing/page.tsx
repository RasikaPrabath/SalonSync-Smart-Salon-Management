import { CreditCard, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function BillingSettingsPage() {
  return (
    <div className="max-w-xl">
      <Card>
        <CardContent className="py-12 text-center">
          <div className="w-14 h-14 rounded-xl bg-[hsl(var(--success-bg))] flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-7 h-7 text-[hsl(var(--success-foreground))]" />
          </div>
          <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">Billing & Subscription</h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] max-w-xs mx-auto mb-3">
            You&apos;re on the <strong>Free Plan</strong> during the early access period.
          </p>
          <p className="text-sm text-[hsl(var(--foreground-muted))] max-w-xs mx-auto mb-4">
            Paid plans with advanced features are coming soon.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(var(--success-bg))] text-[hsl(var(--success-foreground))] text-xs font-medium">
            Free Early Access
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
