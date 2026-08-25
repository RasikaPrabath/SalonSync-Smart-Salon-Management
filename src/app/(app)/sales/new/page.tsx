'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Select, Textarea } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toaster'
import Link from 'next/link'

import { addSale } from '@/app/actions/sales'

const paymentOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'other', label: 'Other' },
]

export default function NewSalePage() {
  const t = useTranslations('sales')
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    amount: '',
    paymentMethod: 'cash',
    note: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.amount || isNaN(Number(form.amount))) return

    setLoading(true)
    const { error } = await addSale(Number(form.amount), form.paymentMethod, form.note)
    setLoading(false)

    if (error) {
      toast({ type: 'error', title: 'Error adding sale', description: error })
      return
    }

    toast({ type: 'success', title: t('saved') })
    router.push('/sales')
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/sales">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-page-title">{t('new')}</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[hsl(var(--success-bg))] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[hsl(var(--success-foreground))]" />
            </div>
            <CardTitle>{t('new')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label={t('amount')}
                  type="number"
                  min="0"
                  step="50"
                  placeholder="0"
                  required
                  value={form.amount}
                  onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                />
                
                <Select
                  label={t('paymentMethod')}
                  options={paymentOptions}
                  value={form.paymentMethod}
                  onChange={e => setForm(p => ({ ...p, paymentMethod: e.target.value }))}
                />
              </div>

              <div className="h-full">
                <Textarea
                  label={t('note')}
                  placeholder={t('notePlaceholder')}
                  value={form.note}
                  onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                  className="h-[120px] resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[hsl(var(--border-subtle))] md:justify-end">
              <Link href="/sales" className="flex-1 md:flex-none">
                <Button variant="secondary" className="w-full md:w-auto" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" loading={loading} className="flex-1 md:flex-none">
                Record Sale
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
