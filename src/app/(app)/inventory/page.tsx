'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Package, Plus, AlertTriangle, ChevronRight } from 'lucide-react'
import { DEMO_PRODUCTS } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DesktopPageHeader } from '@/components/layout/top-nav'

export default function InventoryPage() {
  const [filter, setFilter] = useState<'all' | 'low'>('all')

  const filtered = filter === 'low'
    ? DEMO_PRODUCTS.filter(p => p.stockQuantity <= p.lowStockThreshold)
    : DEMO_PRODUCTS

  const lowStockCount = DEMO_PRODUCTS.filter(p => p.stockQuantity <= p.lowStockThreshold).length
  const totalValue = DEMO_PRODUCTS.reduce((sum, p) => sum + p.stockQuantity * p.unitCost, 0)

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="Inventory">
        <Link href="/inventory/new">
          <Button size="sm"><Plus className="w-4 h-4" /> Add Product</Button>
        </Link>
      </DesktopPageHeader>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="text-card-label">Total Products</p>
          <p className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">{DEMO_PRODUCTS.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-card-label">Stock Value</p>
          <p className="text-xl font-bold font-tabular text-[hsl(var(--success-foreground))] mt-1">
            {formatCurrency(totalValue)}
          </p>
        </Card>
      </div>

      {/* Low stock alert banner */}
      {lowStockCount > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--warning-bg))] border border-[hsl(var(--warning)/0.25)]">
          <AlertTriangle className="w-5 h-5 text-[hsl(var(--warning-foreground))] shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[hsl(var(--warning-foreground))]">
              {lowStockCount} item{lowStockCount > 1 ? 's' : ''} running low
            </p>
            <p className="text-xs text-[hsl(var(--foreground-muted))]">Restock soon to avoid running out</p>
          </div>
          <button
            onClick={() => setFilter(filter === 'low' ? 'all' : 'low')}
            className="text-xs font-semibold text-[hsl(var(--warning-foreground))] hover:underline"
          >
            {filter === 'low' ? 'Show all' : 'View'}
          </button>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex gap-2">
        {(['all', 'low'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === f
                ? 'bg-[hsl(var(--primary))] text-white'
                : 'bg-[hsl(var(--background-3))] text-[hsl(var(--foreground-muted))]'
            }`}
          >
            {f === 'all' ? 'All Products' : `⚠ Low Stock (${lowStockCount})`}
          </button>
        ))}
      </div>

      {/* Product list */}
      <div className="space-y-2">
        {filtered.map(product => {
          const isLow = product.stockQuantity <= product.lowStockThreshold
          const stockPercent = Math.min(100, (product.stockQuantity / (product.lowStockThreshold * 2)) * 100)

          return (
            <div
              key={product.id}
              className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border-subtle))] hover:border-[hsl(var(--border))] transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isLow ? 'bg-[hsl(var(--warning-bg))]' : 'bg-[hsl(var(--success-bg))]'
                  }`}>
                    <Package className={`w-5 h-5 ${isLow ? 'text-[hsl(var(--warning-foreground))]' : 'text-[hsl(var(--success-foreground))]'}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">{product.name}</p>
                    <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">
                      Unit cost: {formatCurrency(product.unitCost)}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-base font-bold font-tabular text-[hsl(var(--foreground))]">
                      {product.stockQuantity}
                    </span>
                    <Badge variant={isLow ? 'warning' : 'success'}>
                      {isLow ? 'Low' : 'OK'}
                    </Badge>
                  </div>
                  <p className="text-xs text-[hsl(var(--foreground-subtle))] mt-0.5">
                    Alert at {product.lowStockThreshold}
                  </p>
                </div>
              </div>

              {/* Stock bar */}
              <div className="mt-3">
                <div className="h-1.5 bg-[hsl(var(--background-3))] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isLow ? 'bg-[hsl(var(--warning))]' : 'bg-[hsl(var(--success))]'
                    }`}
                    style={{ width: `${stockPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="lg:hidden">
        <Link href="/inventory/new">
          <Button className="w-full" size="lg"><Plus className="w-5 h-5" /> Add Product</Button>
        </Link>
      </div>
    </div>
  )
}
