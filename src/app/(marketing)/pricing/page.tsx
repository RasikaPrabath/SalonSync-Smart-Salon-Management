import Link from 'next/link'
import { CheckCircle2, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pricing' }

const plans = [
  {
    name: 'Free',
    price: 'Rs. 0',
    period: '/month',
    description: 'Perfect to get started',
    features: [
      'Dashboard with profit tracking',
      'Sales & expense logging',
      'Appointment booking',
      'Customer list (up to 50)',
      'Dark & light mode',
      'English & Sinhala',
    ],
    cta: 'Start Free',
    href: '/signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'Rs. 990',
    period: '/month',
    description: 'For growing salons',
    features: [
      'Everything in Free',
      'Unlimited customers',
      'Inventory tracking',
      'Staff management',
      'Commission reports',
      'Detailed P&L charts',
      'WhatsApp reminders',
      'Priority support',
    ],
    cta: 'Coming Soon',
    href: '/signup',
    highlight: true,
  },
]

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[hsl(var(--foreground))] tracking-tight mb-4">
          Simple, honest pricing
        </h1>
        <p className="text-lg text-[hsl(var(--foreground-muted))]">
          Start free. Upgrade when you need more.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 border transition-all duration-200 ${
              plan.highlight
                ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary-muted))] shadow-xl shadow-[hsl(var(--primary)/0.1)]'
                : 'border-[hsl(var(--border-subtle))] bg-[hsl(var(--card))]'
            }`}
          >
            {plan.highlight && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--primary))] text-white text-xs font-bold mb-4">
                <Zap className="w-3 h-3" /> Most Popular
              </div>
            )}
            <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">{plan.name}</h2>
            <p className="text-[hsl(var(--foreground-muted))] text-sm mt-1">{plan.description}</p>
            <div className="flex items-end gap-1 mt-4 mb-6">
              <span className="text-4xl font-bold font-tabular text-[hsl(var(--foreground))]">{plan.price}</span>
              <span className="text-[hsl(var(--foreground-muted))] pb-1">{plan.period}</span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[hsl(var(--foreground))]">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success-foreground))] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={`block w-full text-center h-11 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center ${
                plan.highlight
                  ? 'bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary-hover))]'
                  : 'border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background-3))]'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
