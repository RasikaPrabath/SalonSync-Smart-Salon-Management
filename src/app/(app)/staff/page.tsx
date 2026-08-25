'use client'

import Link from 'next/link'
import { UserCog, Plus, TrendingUp } from 'lucide-react'
import { DEMO_STAFF, DEMO_SALES } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { DesktopPageHeader } from '@/components/layout/top-nav'

function calcCommission(staffId: string, commissionPercent: number): number {
  const staffSales = DEMO_SALES.filter(s => {
    // Link sales via appointments — for demo, distribute by staff_id ratio
    return true // simplified: all sales split
  })
  const total = DEMO_SALES.reduce((sum, s) => sum + s.amount, 0)
  // Simplified: staff earns commission % of their attributed sales
  // In real app, link sales → appointments → staff
  const attributed = total * 0.4 // 40% attributed to Saman (staff)
  return staffId === 'staff-2' ? (attributed * commissionPercent) / 100 : 0
}

export default function StaffPage() {
  const totalPayroll = DEMO_STAFF.reduce((sum, s) => {
    return sum + calcCommission(s.id, s.commissionPercent)
  }, 0)

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="Staff">
        <Link href="/staff/new">
          <Button size="sm"><Plus className="w-4 h-4" /> Add Staff</Button>
        </Link>
      </DesktopPageHeader>

      {/* Payroll summary */}
      <div className="p-4 rounded-xl bg-[hsl(var(--warning-bg))] border border-[hsl(var(--warning)/0.2)]">
        <p className="text-xs text-[hsl(var(--foreground-muted))]">Commission This Month</p>
        <p className="text-2xl font-bold font-tabular text-[hsl(var(--warning-foreground))]">
          {formatCurrency(totalPayroll)}
        </p>
      </div>

      {/* Staff list */}
      <div className="space-y-3">
        {DEMO_STAFF.map(staff => {
          const commission = calcCommission(staff.id, staff.commissionPercent)
          return (
            <Link key={staff.id} href={`/staff/${staff.id}`}>
              <Card className="hover:border-[hsl(var(--border))] transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {staff.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{staff.name}</p>
                        <Badge variant={staff.role === 'owner' ? 'primary' : 'info'}>
                          {staff.role === 'owner' ? 'Owner' : 'Staff'}
                        </Badge>
                      </div>
                      {staff.phone && (
                        <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">{staff.phone}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {staff.commissionPercent > 0 ? (
                        <>
                          <p className="text-sm font-bold font-tabular text-[hsl(var(--success-foreground))]">
                            {formatCurrency(commission)}
                          </p>
                          <p className="text-xs text-[hsl(var(--foreground-muted))]">
                            {staff.commissionPercent}% commission
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-[hsl(var(--foreground-subtle))]">No commission</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="lg:hidden">
        <Link href="/staff/new">
          <Button className="w-full" size="lg"><Plus className="w-5 h-5" /> Add Staff</Button>
        </Link>
      </div>
    </div>
  )
}
