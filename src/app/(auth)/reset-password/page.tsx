'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ password: '', confirmPassword: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    router.push('/login')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Password</CardTitle>
        <CardDescription>Choose a strong password</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="New Password" type="password" required placeholder="••••••••" minLength={8}
            value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
          <Input label="Confirm Password" type="password" required placeholder="••••••••"
            value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
            error={form.confirmPassword && form.password !== form.confirmPassword ? "Passwords don't match" : undefined} />
          <Button type="submit" loading={loading} className="w-full" size="lg">Reset Password</Button>
        </form>
      </CardContent>
    </Card>
  )
}
