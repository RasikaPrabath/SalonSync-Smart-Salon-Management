'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toaster'
import Link from 'next/link'

export default function NewCustomerPage() {
  const t = useTranslations('customers')
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', notes: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    toast({ type: 'success', title: t('saved') })
    router.push('/customers')
  }

  return (
    <div className="max-w-2xl mx-auto w-full pt-4">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/customers"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">{t('new')}</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[hsl(var(--primary-muted))] flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-[hsl(var(--primary))]" />
            </div>
            <CardTitle>{t('new')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label={t('name')} required placeholder="Nimal Bandara" value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            <Input label={t('phone')} type="tel" placeholder={t('phonePlaceholder')} value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            <Textarea label={t('notes')} placeholder={t('notesPlaceholder')} value={form.notes}
              onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3} />
            <div className="flex gap-3 pt-2">
              <Link href="/customers" className="flex-1">
                <Button variant="secondary" className="w-full" type="button">Cancel</Button>
              </Link>
              <Button type="submit" loading={loading} className="flex-1">Add Customer</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
