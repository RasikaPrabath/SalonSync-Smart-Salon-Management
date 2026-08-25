'use client'

import Link from 'next/link'
import { Plus, UserCircle, Phone, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DesktopPageHeader } from '@/components/layout/top-nav'

export function StaffClient({ staff }: { staff: any[] }) {
  // In a real app we'd fetch this from Supabase too, but for now we'll just show 0
  const activeAppointmentsCount = 0

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="Staff">
        <Link href="/staff/new">
          <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Staff</Button>
        </Link>
      </DesktopPageHeader>

      <div className="grid gap-3">
        {staff.map(member => (
          <Link key={member.id} href={`/staff/${member.id}`}>
            <div className="bg-[hsl(var(--card))] rounded-xl p-4 border border-[hsl(var(--border))] hover:border-[hsl(var(--border-strong))] transition-colors flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary-muted))] flex items-center justify-center shrink-0">
                <span className="text-[hsl(var(--primary))] font-bold text-lg">{member.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-bold text-[hsl(var(--foreground))] text-sm truncate">{member.name}</p>
                  <Badge variant={member.role === 'owner' ? 'primary' : 'neutral'}>
                    {member.role === 'owner' ? 'Owner' : 'Staff'}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-[hsl(var(--foreground-muted))] mt-1.5">
                  <span className="flex items-center gap-1"><UserCircle className="w-3.5 h-3.5" /> {member.commission_rate}% comm.</span>
                  {member.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {member.phone}</span>}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[hsl(var(--foreground-subtle))]" />
            </div>
          </Link>
        ))}

        {staff.length === 0 && (
          <div className="text-center py-10 bg-[hsl(var(--background-3))] rounded-xl border border-dashed border-[hsl(var(--border))]">
            <UserCircle className="w-8 h-8 text-[hsl(var(--foreground-subtle))] mx-auto mb-2" />
            <p className="text-sm font-medium text-[hsl(var(--foreground-muted))]">No staff members found</p>
          </div>
        )}
      </div>

      {/* Quick Action mobile FAB */}
      <Link href="/staff/new" className="lg:hidden fixed bottom-[88px] right-4 w-12 h-12 bg-[hsl(var(--primary))] text-white rounded-full flex items-center justify-center shadow-xl shadow-[hsl(var(--primary)/0.2)]">
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
