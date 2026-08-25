'use client'

import { useState } from 'react'
import { useToast } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Store } from 'lucide-react'

export default function ProfileSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: 'My Salon',
    phone: '',
    address: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    toast({ type: 'success', title: 'Profile updated!' })
  }

  return (
    <div className="max-w-xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[hsl(var(--primary-muted))] flex items-center justify-center">
              <Store className="w-5 h-5 text-[hsl(var(--primary))]" />
            </div>
            <CardTitle>Salon Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Salon Name"
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            />
            <Input
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            />
            <Textarea
              label="Address"
              value={form.address}
              onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
              rows={2}
            />
            <Button type="submit" loading={loading}>Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
