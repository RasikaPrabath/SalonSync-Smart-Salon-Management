'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, UserCircle, Phone, ArrowRight, AlertTriangle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DesktopPageHeader } from '@/components/layout/top-nav'

export function CustomersClient({ customers, error }: { customers: any[], error?: string }) {
  const [search, setSearch] = useState('')

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  )

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="Customers">
        <Link href="/customers/new">
          <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Customer</Button>
        </Link>
      </DesktopPageHeader>

      {error && (
        <div className="p-4 bg-[hsl(var(--warning-bg))] border border-[hsl(var(--warning)/0.2)] rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[hsl(var(--warning-foreground))] shrink-0 mt-0.5" />
          <p className="text-sm text-[hsl(var(--warning-foreground))]">{error}</p>
        </div>
      )}

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground-muted))]" />
        <Input
          placeholder="Search customers by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-[hsl(var(--background-3))] border-transparent focus:bg-[hsl(var(--background))] focus:border-[hsl(var(--primary))]"
        />
      </div>

      <div className="space-y-3">
        {filteredCustomers.map(customer => (
          <Link key={customer.id} href={`/customers/${customer.id}`}>
            <div className="bg-[hsl(var(--card))] rounded-xl p-4 border border-[hsl(var(--border))] hover:border-[hsl(var(--border-strong))] transition-colors flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary-muted))] flex items-center justify-center shrink-0">
                <span className="text-[hsl(var(--primary))] font-bold text-lg">{customer.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[hsl(var(--foreground))] text-sm truncate">{customer.name}</p>
                {customer.phone && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-[hsl(var(--foreground-muted))]">
                    <Phone className="w-3.5 h-3.5" /> {customer.phone}
                  </div>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-[hsl(var(--foreground-subtle))]" />
            </div>
          </Link>
        ))}

        {filteredCustomers.length === 0 && !error && (
          <div className="text-center py-10 bg-[hsl(var(--background-3))] rounded-xl border border-dashed border-[hsl(var(--border))]">
            <UserCircle className="w-8 h-8 text-[hsl(var(--foreground-subtle))] mx-auto mb-2" />
            <p className="text-sm font-medium text-[hsl(var(--foreground-muted))]">No customers found</p>
          </div>
        )}
      </div>
      
      {/* Quick Action mobile FAB */}
      <Link href="/customers/new" className="lg:hidden fixed bottom-[88px] right-4 w-12 h-12 bg-[hsl(var(--primary))] text-white rounded-full flex items-center justify-center shadow-xl shadow-[hsl(var(--primary)/0.2)]">
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
