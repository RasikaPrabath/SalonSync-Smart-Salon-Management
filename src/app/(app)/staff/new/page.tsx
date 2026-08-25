'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Input, Select } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addStaffMember } from '@/app/actions/staff'
import { useToast } from '@/components/ui/toaster'

const roles = [
  { value: 'staff', label: 'Staff Member' },
  { value: 'owner', label: 'Owner / Manager' },
]

export default function NewStaffPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    role: 'staff',
    phone: '',
    commissionRate: '0'
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('role', form.role)
    formData.append('phone', form.phone)
    formData.append('commission_rate', form.commissionRate)

    const res = await addStaffMember(formData)
    
    setLoading(false)
    if (res.error) {
      toast({ title: 'Error', description: res.error, type: 'error' })
    } else {
      toast({ title: 'Success', description: 'Staff member added successfully', type: 'success' })
      router.push('/staff')
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full pt-4">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/staff"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">Add Staff</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input label="Full Name" placeholder="e.g. Kamal Perera" required
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                
                <Select label="Role" options={roles} value={form.role}
                  onChange={e => setForm(p => ({ ...p, role: e.target.value }))} />
              </div>

              <div className="space-y-4">
                <Input label="Phone Number (optional)" type="tel" placeholder="077 123 4567"
                  value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                
                <Input label="Commission Rate (%)" type="number" min="0" max="100" placeholder="0" required
                  value={form.commissionRate} onChange={e => setForm(p => ({ ...p, commissionRate: e.target.value }))} />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[hsl(var(--border-subtle))] md:justify-end">
              <Link href="/staff" className="flex-1 md:flex-none">
                <Button variant="secondary" className="w-full md:w-auto" type="button">Cancel</Button>
              </Link>
              <Button type="submit" loading={loading} className="flex-1 md:flex-none">Add Staff</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
