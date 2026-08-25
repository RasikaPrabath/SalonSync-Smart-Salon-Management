import Link from 'next/link'
import { Scissors } from 'lucide-react'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Minimal marketing header */}
      <header className="sticky top-0 z-30 glass border-b border-[hsl(var(--border-subtle))]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[hsl(var(--foreground))]">
              Salon<span className="text-[hsl(var(--primary))]">Sync</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-sm text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="h-9 px-4 rounded-xl bg-[hsl(var(--primary))] text-white text-sm font-medium hover:bg-[hsl(var(--primary-hover))] transition-colors flex items-center"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border-subtle))] mt-24">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[hsl(var(--primary))] flex items-center justify-center">
              <Scissors className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-[hsl(var(--foreground))]">
              Salon<span className="text-[hsl(var(--primary))]">Sync</span>
            </span>
          </div>
          <p className="text-sm text-[hsl(var(--foreground-subtle))]">
            Built for Sri Lankan salon owners. © 2026 SalonSync.
          </p>
          <div className="flex gap-4 text-sm text-[hsl(var(--foreground-muted))]">
            <Link href="/pricing" className="hover:text-[hsl(var(--foreground))]">Pricing</Link>
            <Link href="/about" className="hover:text-[hsl(var(--foreground))]">About</Link>
            <Link href="/contact" className="hover:text-[hsl(var(--foreground))]">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
