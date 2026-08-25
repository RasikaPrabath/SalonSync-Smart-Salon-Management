'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Package, AlertTriangle, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DesktopPageHeader } from '@/components/layout/top-nav'

export function InventoryClient({ inventory }: { inventory: any[] }) {
  const [search, setSearch] = useState('')

  const filteredItems = inventory.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  )

  const lowStockCount = inventory.filter(i => Number(i.stock) <= Number(i.min_stock)).length
  const totalValue = inventory.reduce((sum, i) => sum + (Number(i.price) * Number(i.stock)), 0)

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="Inventory">
        <Link href="/inventory/new">
          <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Product</Button>
        </Link>
      </DesktopPageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[hsl(var(--background-3))] p-4 rounded-xl border border-[hsl(var(--border-subtle))]">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-sm text-[hsl(var(--foreground-muted))]">Total Value</span>
          </div>
          <p className="text-lg font-bold font-tabular">{formatCurrency(totalValue)}</p>
        </div>
        <div className={`p-4 rounded-xl border ${lowStockCount > 0 ? 'bg-[hsl(var(--warning-bg))] border-[hsl(var(--warning)/0.2)]' : 'bg-[hsl(var(--background-3))] border-[hsl(var(--border-subtle))]'}`}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className={`w-4 h-4 ${lowStockCount > 0 ? 'text-[hsl(var(--warning-foreground))]' : 'text-[hsl(var(--success-foreground))]'}`} />
            <span className={`text-sm ${lowStockCount > 0 ? 'text-[hsl(var(--warning-foreground))]' : 'text-[hsl(var(--foreground-muted))]'}`}>Low Stock</span>
          </div>
          <p className="text-lg font-bold font-tabular">{lowStockCount} items</p>
        </div>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground-muted))]" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-[hsl(var(--background-3))] border-transparent focus:bg-[hsl(var(--background))] focus:border-[hsl(var(--primary))]"
        />
      </div>

      <div className="space-y-3">
        {filteredItems.map(item => {
          const isLowStock = Number(item.stock) <= Number(item.min_stock)
          return (
            <div key={item.id} className="bg-[hsl(var(--card))] rounded-xl p-4 border border-[hsl(var(--border))] flex items-center justify-between">
              <div>
                <p className="font-bold text-[hsl(var(--foreground))] text-sm">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="neutral">{item.category}</Badge>
                  <span className="text-xs text-[hsl(var(--foreground-muted))]">{formatCurrency(item.price)} each</span>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xl font-bold font-tabular ${isLowStock ? 'text-[hsl(var(--warning-foreground))]' : 'text-[hsl(var(--foreground))]'}`}>
                  {item.stock}
                </p>
                <p className={`text-[10px] ${isLowStock ? 'text-[hsl(var(--warning-foreground))]' : 'text-[hsl(var(--foreground-subtle))]'}`}>
                  in stock
                </p>
              </div>
            </div>
          )
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-10 bg-[hsl(var(--background-3))] rounded-xl border border-dashed border-[hsl(var(--border))]">
            <Package className="w-8 h-8 text-[hsl(var(--foreground-subtle))] mx-auto mb-2" />
            <p className="text-sm font-medium text-[hsl(var(--foreground-muted))]">No products found</p>
          </div>
        )}
      </div>
      
      {/* Quick Action mobile FAB */}
      <Link href="/inventory/new" className="lg:hidden fixed bottom-[88px] right-4 w-12 h-12 bg-[hsl(var(--primary))] text-white rounded-full flex items-center justify-center shadow-xl shadow-[hsl(var(--primary)/0.2)]">
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
