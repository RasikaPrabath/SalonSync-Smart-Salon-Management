'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Scissors, CheckCircle2 } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function OnboardingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary))] flex items-center justify-center mx-auto mb-4">
          <Scissors className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] tracking-tight">Set up your salon</h1>
        <p className="text-sm text-[hsl(var(--foreground-muted))] mt-2">
          Tell us about your business to get started
        </p>
      </div>

      <Card>
        <CardContent className="pt-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Salon Name" required placeholder="e.g. Kumara's Barber Shop"
              value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            <Input label="Business Phone" type="tel" placeholder="0771234567"
              value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            <Textarea label="Address" placeholder="e.g. 12 Galle Road, Colombo 3" rows={2}
              value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Let&apos;s Go! 🎉
            </Button>
            <button type="button" onClick={() => router.push('/dashboard')}
              className="w-full text-center text-sm text-[hsl(var(--foreground-subtle))] hover:text-[hsl(var(--foreground-muted))] transition-colors">
              Skip for now
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
