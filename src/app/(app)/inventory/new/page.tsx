'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Input, Select } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addInventoryItem } from '@/app/actions/inventory'
import { useToast } from '@/components/ui/toaster'

const categories = [
  { value: 'hair-care', label: 'Hair Care' },
  { value: 'skin-care', label: 'Skin Care' },
  { value: 'styling', label: 'Styling' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'consumables', label: 'Consumables' },
]

export default function NewInventoryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    category: 'hair-care',
    price: '',
    stock: '',
    minStock: '5'
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('category', categories.find(c => c.value === form.category)?.label || form.category)
    formData.append('price', form.price)
    formData.append('stock', form.stock)
    formData.append('minStock', form.minStock)

    const res = await addInventoryItem(formData)
    
    setLoading(false)
    if (res.error) {
      toast({ title: 'Error', description: res.error, type: 'error' })
    } else {
      toast({ title: 'Success', description: 'Product added successfully', type: 'success' })
      router.push('/inventory')
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full pt-4">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/inventory"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">Add Product</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input label="Product Name" placeholder="e.g. L'Oreal Shampoo" required
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                <Select label="Category" options={categories} value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))} />
              </div>
              <div className="space-y-4">
                <Input label="Price / Cost (Rs.)" type="number" min="0" placeholder="0" required
                  value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Initial Stock" type="number" min="0" placeholder="0" required
                    value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} />
                  <Input label="Low Stock Alert" type="number" min="0" placeholder="5" required
                    value={form.minStock} onChange={e => setForm(p => ({ ...p, minStock: e.target.value }))} />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[hsl(var(--border-subtle))] md:justify-end">
              <Link href="/inventory" className="flex-1 md:flex-none">
                <Button variant="secondary" className="w-full md:w-auto" type="button">Cancel</Button>
              </Link>
              <Button type="submit" loading={loading} className="flex-1 md:flex-none">Add Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
