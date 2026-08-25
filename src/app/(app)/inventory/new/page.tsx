'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toaster'
import Link from 'next/link'

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', stockQuantity: '', lowStockThreshold: '5', unitCost: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    toast({ type: 'success', title: 'Product added!' })
    router.push('/inventory')
  }

  return (
    <div className="max-w-2xl mx-auto w-full pt-4">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/inventory"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">Add Product</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[hsl(var(--warning-bg))] flex items-center justify-center">
              <Package className="w-5 h-5 text-[hsl(var(--warning-foreground))]" />
            </div>
            <CardTitle>New Product</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Product Name" required placeholder="e.g. Wella Shampoo (1L)"
              value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Stock Quantity" type="number" min="0" required placeholder="0"
                value={form.stockQuantity} onChange={e => setForm(p => ({ ...p, stockQuantity: e.target.value }))} />
              <Input label="Low Stock Alert At" type="number" min="0" required placeholder="5"
                value={form.lowStockThreshold} onChange={e => setForm(p => ({ ...p, lowStockThreshold: e.target.value }))} />
            </div>
            <Input label="Unit Cost (Rs.)" type="number" min="0" placeholder="0"
              value={form.unitCost} onChange={e => setForm(p => ({ ...p, unitCost: e.target.value }))} />
            <div className="flex gap-3 pt-2">
              <Link href="/inventory" className="flex-1">
                <Button variant="secondary" className="w-full" type="button">Cancel</Button>
              </Link>
              <Button type="submit" loading={loading} className="flex-1">Add Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
