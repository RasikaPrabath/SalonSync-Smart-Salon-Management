'use client'

import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--danger-bg))] flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-[hsl(var(--danger-foreground))]" />
        </div>
        <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mb-2">Something went wrong</h1>
        <p className="text-sm text-[hsl(var(--foreground-muted))] mb-8 max-w-xs mx-auto">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Link href="/dashboard"><Button variant="secondary">Go Home</Button></Link>
        </div>
      </div>
    </div>
  )
}
