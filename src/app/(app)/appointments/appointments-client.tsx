'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Calendar as CalendarIcon, Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DesktopPageHeader } from '@/components/layout/top-nav'

export function AppointmentsClient({ appointments }: { appointments: any[] }) {
  const [search, setSearch] = useState('')

  const today = new Date().toDateString()

  const filteredAppointments = appointments.filter(apt => 
    apt.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    apt.service.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    // Sort by date then time
    const dateA = new Date(`${a.date}T${a.time}`)
    const dateB = new Date(`${b.date}T${b.time}`)
    return dateA.getTime() - dateB.getTime()
  })

  // Separate into Today and Upcoming
  const todayAppointments = filteredAppointments.filter(apt => new Date(apt.date).toDateString() === today)
  const otherAppointments = filteredAppointments.filter(apt => new Date(apt.date).toDateString() !== today)

  function renderList(list: any[], title: string, emptyMessage: string) {
    if (list.length === 0) {
      return (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-[hsl(var(--foreground-muted))] uppercase tracking-wider mb-3">{title}</h2>
          <div className="text-center py-6 bg-[hsl(var(--background-3))] rounded-xl border border-dashed border-[hsl(var(--border))]">
            <p className="text-sm text-[hsl(var(--foreground-muted))]">{emptyMessage}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="mb-6">
        <h2 className="text-sm font-bold text-[hsl(var(--foreground-muted))] uppercase tracking-wider mb-3">{title}</h2>
        <div className="space-y-3">
          {list.map(apt => (
            <Link key={apt.id} href={`/appointments/${apt.id}`}>
              <div className="bg-[hsl(var(--card))] rounded-xl p-4 border border-[hsl(var(--border))] hover:border-[hsl(var(--border-strong))] transition-colors flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-[hsl(var(--foreground))] text-sm">{apt.customer_name}</p>
                    <Badge variant={apt.status === 'Completed' ? 'success' : apt.status === 'no-show' ? 'danger' : 'info'}>
                      {apt.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[hsl(var(--foreground-muted))]">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {apt.time}</span>
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {formatDate(apt.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{apt.service}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[hsl(var(--foreground-subtle))]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="Appointments">
        <Link href="/appointments/new">
          <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Book Appt</Button>
        </Link>
      </DesktopPageHeader>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground-muted))]" />
        <Input
          placeholder="Search customer or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-[hsl(var(--background-3))] border-transparent focus:bg-[hsl(var(--background))] focus:border-[hsl(var(--primary))]"
        />
      </div>

      {renderList(todayAppointments, "Today's Appointments", "No appointments scheduled for today.")}
      {renderList(otherAppointments, "All Other Appointments", "No other appointments found.")}
      
      {/* Quick Action mobile FAB */}
      <Link href="/appointments/new" className="lg:hidden fixed bottom-[88px] right-4 w-12 h-12 bg-[hsl(var(--primary))] text-white rounded-full flex items-center justify-center shadow-xl shadow-[hsl(var(--primary)/0.2)]">
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
