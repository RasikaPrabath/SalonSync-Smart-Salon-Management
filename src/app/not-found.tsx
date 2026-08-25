import Link from 'next/link'
import { Scissors } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary-muted))] flex items-center justify-center mx-auto mb-6">
          <Scissors className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
        <h1 className="text-6xl font-bold text-[hsl(var(--foreground))] mb-2">404</h1>
        <p className="text-lg text-[hsl(var(--foreground-muted))] mb-8">This page doesn&apos;t exist</p>
        <Link
          href="/dashboard"
          className="h-10 px-6 rounded-xl bg-[hsl(var(--primary))] text-white font-medium text-sm hover:bg-[hsl(var(--primary-hover))] transition-colors inline-flex items-center"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
