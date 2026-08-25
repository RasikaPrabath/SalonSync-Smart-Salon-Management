'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addAppointment } from '@/app/actions/appointments'
import { useToast } from '@/components/ui/toaster'

export default function NewAppointmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customer_name: '',
    service: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    price: ''
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('customer_name', form.customer_name)
    formData.append('service', form.service)
    formData.append('date', form.date)
    formData.append('time', form.time)
    formData.append('price', form.price)

    const res = await addAppointment(formData)
    
    setLoading(false)
    if (res.error) {
      toast({ title: 'Error', description: res.error, type: 'error' })
    } else {
      toast({ title: 'Success', description: 'Appointment booked successfully', type: 'success' })
      router.push('/appointments')
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full pt-4">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/appointments"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">Book Appointment</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input label="Customer Name" placeholder="e.g. Kasun Fernando" required
                  value={form.customer_name} onChange={e => setForm(p => ({ ...p, customer_name: e.target.value }))} />
                
                <Input label="Service" placeholder="e.g. Haircut" required
                  value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Date" type="date" required
                    value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
                  <Input label="Time" type="time" required
                    value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} />
                </div>
                
                <Input label="Estimated Price (Rs.)" type="number" min="0" placeholder="0" required
                  value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[hsl(var(--border-subtle))] md:justify-end">
              <Link href="/appointments" className="flex-1 md:flex-none">
                <Button variant="secondary" className="w-full md:w-auto" type="button">Cancel</Button>
              </Link>
              <Button type="submit" loading={loading} className="flex-1 md:flex-none">Book</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
