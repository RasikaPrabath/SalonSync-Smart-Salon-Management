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
    <div className="w-full space-y-6">
      {/* Current plan badge */}
      <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-[hsl(var(--success-bg))] border border-[hsl(var(--success)/0.2)]">
        <div className="w-10 h-10 rounded-xl bg-[hsl(var(--success)/0.2)] flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-[hsl(var(--success-foreground))]" />
        </div>
        <div>
          <p className="text-sm sm:text-base font-bold text-[hsl(var(--success-foreground))]">You&apos;re on the Free Beta Plan</p>
          <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">Early access — all core features are 100% free during the public beta</p>
        </div>
      </div>

      {/* Plan comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Free */}
        <Card className="border-2 border-[hsl(var(--primary))] bg-[hsl(var(--primary-muted)/0.3)] shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Free Starter</CardTitle>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[hsl(var(--primary))] text-white shadow-xs">Current Plan</span>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold font-tabular text-[hsl(var(--foreground))]">Rs. 0<span className="text-sm font-normal text-[hsl(var(--foreground-muted))]"> / month</span></p>
              <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">Essential tools for individual salons</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-0">
            <div className="border-t border-[hsl(var(--border-subtle))] pt-3 space-y-2">
              {freeFeatures.map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success-foreground))] shrink-0" />
                  <span className="text-xs text-[hsl(var(--foreground))]">{f}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pro */}
        <Card className="border border-[hsl(var(--border))] hover:border-[hsl(var(--border-strong))] transition-all">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Salon Pro</CardTitle>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-foreground))] flex items-center gap-1">
                <Zap className="w-3 h-3" /> Coming Soon
              </span>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold font-tabular text-[hsl(var(--foreground))]">Rs. 990<span className="text-sm font-normal text-[hsl(var(--foreground-muted))]"> / month</span></p>
              <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">Advanced automation & AI intelligence</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-0">
            <div className="border-t border-[hsl(var(--border-subtle))] pt-3 space-y-2">
              {proFeatures.map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0" />
                  <span className="text-xs text-[hsl(var(--foreground-muted))]">{f}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-center text-[hsl(var(--foreground-subtle))] pt-2">
        Paid plans launch soon. You&apos;ll be notified when Pro is available.
      </p>
    </div>
  )
}
