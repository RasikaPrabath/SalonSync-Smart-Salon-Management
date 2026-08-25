'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome back to SalonSync</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          />
          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
          />
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-xs text-[hsl(var(--primary))] hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Sign In
          </Button>
        </form>
        <p className="text-center text-sm text-[hsl(var(--foreground-muted))] mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[hsl(var(--primary))] hover:underline font-medium">
            Create one
          </Link>
        </p>

        {/* Demo login hint */}
        <div className="mt-4 p-3 rounded-xl bg-[hsl(var(--background-3))] text-center">
          <p className="text-xs text-[hsl(var(--foreground-muted))]">
            <strong className="text-[hsl(var(--foreground))]">Demo mode</strong> — click Sign In to enter the dashboard
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
