import Link from 'next/link'
import { Scissors } from 'lucide-react'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col justify-between relative overflow-x-hidden selection:bg-[hsl(var(--primary)/0.2)] selection:text-[hsl(var(--primary))]">
      {/* Pure background glow effects ONLY */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top center hero glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[hsl(var(--primary)/0.18)] to-transparent blur-[160px] rounded-full" />

        {/* Top left warm amber glow */}
        <div className="absolute top-48 -left-32 w-[500px] h-[500px] bg-[hsl(38_95%_50%/0.08)] blur-[160px] rounded-full" />

        {/* Middle right terracotta glow */}
        <div className="absolute top-[850px] -right-32 w-[550px] h-[550px] bg-[hsl(var(--primary)/0.12)] blur-[170px] rounded-full" />

        {/* Lower left soft ambient glow */}
        <div className="absolute top-[1700px] -left-40 w-[600px] h-[600px] bg-[hsl(var(--primary)/0.07)] blur-[180px] rounded-full" />
      </div>

      {/* Marketing Header */}
      <header className="sticky top-0 z-30 glass border-b border-[hsl(var(--border-subtle))] bg-[hsl(var(--background)/0.75)] backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center shadow-md shadow-[hsl(var(--primary)/0.3)]">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[hsl(var(--foreground))]">
              Salon<span className="text-[hsl(var(--primary))]">Sync</span>
            </span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="/#features" className="text-sm font-medium text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-sm font-medium text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="h-9 px-4 rounded-xl bg-[hsl(var(--primary))] text-white text-sm font-semibold hover:bg-[hsl(var(--primary-hover))] transition-colors flex items-center shadow-sm shadow-[hsl(var(--primary)/0.3)]"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative z-10">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border-subtle))] bg-[hsl(var(--card)/0.4)] backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[hsl(var(--primary))] flex items-center justify-center">
              <Scissors className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-[hsl(var(--foreground))]">
              Salon<span className="text-[hsl(var(--primary))]">Sync</span>
            </span>
          </div>
          <p className="text-xs text-[hsl(var(--foreground-subtle))]">
            Designed & built for Sri Lankan salon owners. © 2026 SalonSync.
          </p>
          <div className="flex gap-4 text-xs font-medium text-[hsl(var(--foreground-muted))]">
            <Link href="/pricing" className="hover:text-[hsl(var(--foreground))]">Pricing</Link>
            <Link href="/signup" className="hover:text-[hsl(var(--foreground))]">Register</Link>
            <Link href="/login" className="hover:text-[hsl(var(--foreground))]">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
