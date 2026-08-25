'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="w-14 h-14 rounded-full bg-[hsl(var(--success-bg))] flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-[hsl(var(--success-foreground))]" />
          </div>
          <h2 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">Check your email</h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] mb-6">
            We sent a reset link to <strong>{email}</strong>
          </p>
          <Link href="/login"><Button variant="secondary" className="w-full">Back to Sign In</Button></Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>We'll send you a reset link</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" required placeholder="your@email.com"
            value={email} onChange={e => setEmail(e.target.value)} />
          <Button type="submit" loading={loading} className="w-full" size="lg">Send Reset Email</Button>
        </form>
        <p className="text-center text-sm text-[hsl(var(--foreground-muted))] mt-6">
          <Link href="/login" className="text-[hsl(var(--primary))] hover:underline">Back to Sign In</Link>
        </p>
      </CardContent>
    </Card>
  )
}
