'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { CalendarDays, Plus } from 'lucide-react'
import { DEMO_APPOINTMENTS } from '@/lib/demo-data'
import { formatDate, formatTime, getStatusChipClass } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/empty-state'
import { DesktopPageHeader } from '@/components/layout/top-nav'

const statusFilters = ['all', 'booked', 'completed', 'no-show', 'cancelled'] as const

const statusVariant: Record<string, 'success' | 'info' | 'danger' | 'warning'> = {
  completed: 'success',
  booked: 'info',
  'no-show': 'danger',
  cancelled: 'warning',
}

export default function AppointmentsPage() {
  const t = useTranslations('appointments')
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? DEMO_APPOINTMENTS
    : DEMO_APPOINTMENTS.filter(a => a.status === filter)

  return (
    <div className="space-y-5">
      <DesktopPageHeader title={t('title')}>
        <Link href="/appointments/new">
          <Button size="sm"><Plus className="w-4 h-4" />{t('new')}</Button>
        </Link>
      </DesktopPageHeader>

      {/* Status filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusFilters.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 capitalize ${
              filter === s
                ? 'bg-[hsl(var(--primary))] text-white'
                : 'bg-[hsl(var(--background-3))] text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            {s === 'all' ? 'All' : t(`statuses.${s}` as any)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title={t('noAppointments')}
          description={t('noAppointmentsDesc')}
          actionLabel={t('new')}
          onAction={() => {}}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map(apt => (
            <Link key={apt.id} href={`/appointments/${apt.id}`}>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border-subtle))] hover:border-[hsl(var(--border))] transition-all duration-150 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--info-bg))] flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-[hsl(var(--info-foreground))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">
                        {apt.customer?.name ?? t('walkIn')}
                      </p>
                      <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">
                        {apt.serviceName}
                        {apt.staff && ` · ${apt.staff.name}`}
                      </p>
                    </div>
                    <Badge variant={statusVariant[apt.status] ?? 'neutral'}>
                      {apt.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[hsl(var(--foreground-subtle))] mt-1.5">
                    {formatDate(apt.scheduledAt)} at {formatTime(apt.scheduledAt)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="lg:hidden">
        <Link href="/appointments/new">
          <Button className="w-full" size="lg"><Plus className="w-5 h-5" />{t('new')}</Button>
        </Link>
      </div>
    </div>
  )
}
