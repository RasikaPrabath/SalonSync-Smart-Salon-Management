'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Select, Textarea } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toaster'
import Link from 'next/link'
import { DEMO_CUSTOMERS, DEMO_STAFF } from '@/lib/demo-data'
import { formatDateForInput } from '@/lib/utils'

const statusOptions = [
  { value: 'booked', label: 'Booked' },
  { value: 'completed', label: 'Completed' },
  { value: 'no-show', label: 'No Show' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function NewAppointmentPage() {
  const t = useTranslations('appointments')
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    serviceName: '',
    customerId: '',
    staffId: '',
    scheduledAt: formatDateForInput(new Date()),
    price: '',
    status: 'booked',
  })

  const customerOptions = [
    { value: '', label: t('walkIn') },
    ...DEMO_CUSTOMERS.map(c => ({ value: c.id, label: c.name })),
  ]

  const staffOptions = [
    { value: '', label: 'Any staff' },
    ...DEMO_STAFF.map(s => ({ value: s.id, label: s.name })),
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    toast({ type: 'success', title: t('saved') })
    router.push('/appointments')
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/appointments">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <h1 className="text-page-title">{t('new')}</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[hsl(var(--info-bg))] flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-[hsl(var(--info-foreground))]" />
            </div>
            <CardTitle>{t('new')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label={t('service')} required placeholder={t('servicePlaceholder')} value={form.serviceName}
              onChange={e => setForm(p => ({ ...p, serviceName: e.target.value }))} />
            <Input label={t('scheduledAt')} type="datetime-local" required value={form.scheduledAt}
              onChange={e => setForm(p => ({ ...p, scheduledAt: e.target.value }))} />
            <Input label={t('price')} type="number" min="0" step="50" placeholder="0" required value={form.price}
              onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
            <Select label={t('customer')} options={customerOptions} value={form.customerId}
              onChange={e => setForm(p => ({ ...p, customerId: e.target.value }))} />
            <Select label={t('staff')} options={staffOptions} value={form.staffId}
              onChange={e => setForm(p => ({ ...p, staffId: e.target.value }))} />
            <Select label={t('status')} options={statusOptions} value={form.status}
              onChange={e => setForm(p => ({ ...p, status: e.target.value }))} />
            <div className="flex gap-3 pt-2">
              <Link href="/appointments" className="flex-1">
                <Button variant="secondary" className="w-full" type="button">Cancel</Button>
              </Link>
              <Button type="submit" loading={loading} className="flex-1">Book Appointment</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
