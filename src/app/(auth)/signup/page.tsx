'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    router.push('/onboarding')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Start managing your salon smarter</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" required placeholder="your@email.com"
            value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          <Input label="Password" type="password" required placeholder="••••••••" minLength={8}
            value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
          <Input label="Confirm Password" type="password" required placeholder="••••••••"
            value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
            error={form.confirmPassword && form.password !== form.confirmPassword ? "Passwords don't match" : undefined} />
          <Button type="submit" loading={loading} className="w-full" size="lg">Create Account</Button>
        </form>
        <p className="text-center text-sm text-[hsl(var(--foreground-muted))] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[hsl(var(--primary))] hover:underline font-medium">Sign in</Link>
        </p>
      </CardContent>
    </Card>
  )
}
