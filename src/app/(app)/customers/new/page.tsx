'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addCustomer } from '@/app/actions/customers'
import { useToast } from '@/components/ui/toaster'

export default function NewCustomerPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('phone', form.phone)
    formData.append('email', form.email)

    const res = await addCustomer(formData)
    
    setLoading(false)
    if (res.error) {
      toast({ title: 'Error', description: res.error, type: 'error' })
    } else {
      toast({ title: 'Success', description: 'Customer added successfully', type: 'success' })
      router.push('/customers')
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full pt-4">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/customers"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">Add Customer</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input label="Full Name" placeholder="e.g. Nimal Perera" required
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>

              <div className="space-y-4">
                <Input label="Phone Number" type="tel" placeholder="077 123 4567"
                  value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                
                <Input label="Email Address (Optional)" type="email" placeholder="name@example.com"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[hsl(var(--border-subtle))] md:justify-end">
              <Link href="/customers" className="flex-1 md:flex-none">
                <Button variant="secondary" className="w-full md:w-auto" type="button">Cancel</Button>
              </Link>
              <Button type="submit" loading={loading} className="flex-1 md:flex-none">Add Customer</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
