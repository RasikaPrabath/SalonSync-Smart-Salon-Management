'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toaster'
import Link from 'next/link'

export default function NewStaffPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', commissionPercent: '10' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    toast({ type: 'success', title: 'Staff member added!' })
    router.push('/staff')
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/staff"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">Add Staff</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[hsl(var(--info-bg))] flex items-center justify-center">
              <UserCog className="w-5 h-5 text-[hsl(var(--info-foreground))]" />
            </div>
            <CardTitle>New Staff Member</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" required placeholder="e.g. Nuwan Perera"
              value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            <Input label="Phone" type="tel" placeholder="0771234567"
              value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            <Input
              label="Commission %"
              type="number" min="0" max="100" step="1"
              hint="Percentage of service revenue they earn. Set 0 for salary-based staff."
              value={form.commissionPercent}
              onChange={e => setForm(p => ({ ...p, commissionPercent: e.target.value }))}
            />
            <div className="flex gap-3 pt-2">
              <Link href="/staff" className="flex-1">
                <Button variant="secondary" className="w-full" type="button">Cancel</Button>
              </Link>
              <Button type="submit" loading={loading} className="flex-1">Add Staff</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
