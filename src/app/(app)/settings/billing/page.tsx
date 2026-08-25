import { CheckCircle2, Zap, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const freeFeatures = [
  'Dashboard with profit tracking',
  'Sales & expense logging',
  'Appointment booking',
  'Customer list (up to 50)',
  'Inventory tracking',
  'Staff management',
  'Dark & light mode',
  'English & Sinhala',
]

const proFeatures = [
  'Everything in Free',
  'Unlimited customers',
  'WhatsApp reminders',
  'Commission reports',
  'Detailed P&L charts',
  'AI Insights (Phase 3)',
  'Multi-staff access',
  'Priority support',
]

export default function BillingSettingsPage() {
  return (
    <div className="max-w-xl space-y-5">
      {/* Current plan badge */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--success-bg))] border border-[hsl(var(--success)/0.2)]">
        <Shield className="w-5 h-5 text-[hsl(var(--success-foreground))] shrink-0" />
        <div>
          <p className="text-sm font-semibold text-[hsl(var(--success-foreground))]">You&apos;re on the Free Plan</p>
          <p className="text-xs text-[hsl(var(--foreground-muted))]">Early access — all features free during beta</p>
        </div>
      </div>

      {/* Plan comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Free */}
        <Card className="border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary-muted))]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Free</CardTitle>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[hsl(var(--primary))] text-white">Current</span>
            </div>
            <p className="text-2xl font-bold font-tabular text-[hsl(var(--foreground))]">Rs. 0<span className="text-sm font-normal text-[hsl(var(--foreground-muted))]">/mo</span></p>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            {freeFeatures.map(f => (
              <div key={f} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--success-foreground))] shrink-0 mt-0.5" />
                <span className="text-xs text-[hsl(var(--foreground-muted))]">{f}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pro */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Pro</CardTitle>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-foreground))] flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" /> Soon
              </span>
            </div>
            <p className="text-2xl font-bold font-tabular text-[hsl(var(--foreground))]">Rs. 990<span className="text-sm font-normal text-[hsl(var(--foreground-muted))]">/mo</span></p>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            {proFeatures.map(f => (
              <div key={f} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--foreground-subtle))] shrink-0 mt-0.5" />
                <span className="text-xs text-[hsl(var(--foreground-muted))]">{f}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-center text-[hsl(var(--foreground-subtle))]">
        Paid plans launch soon. You&apos;ll be notified when Pro is available.
      </p>
    </div>
  )
}
