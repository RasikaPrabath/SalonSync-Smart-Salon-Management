import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, User, Scissors, Clock, DollarSign, MessageSquare } from 'lucide-react'
import { DEMO_APPOINTMENTS } from '@/lib/demo-data'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const statusVariant: Record<string, 'success' | 'info' | 'danger' | 'warning'> = {
  completed: 'success',
  booked: 'info',
  'no-show': 'danger',
  cancelled: 'warning',
}

export default async function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const apt = DEMO_APPOINTMENTS.find(a => a.id === id)
  if (!apt) notFound()

  return (
    <div className="max-w-2xl mx-auto w-full space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/appointments">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <h1 className="text-page-title">Appointment</h1>
        <Badge variant={statusVariant[apt.status] ?? 'neutral'} className="ml-auto">
          {apt.status}
        </Badge>
      </div>

      <Card>
        <CardContent className="pt-5 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(var(--background-3))]">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--info-bg))] flex items-center justify-center">
              <Scissors className="w-5 h-5 text-[hsl(var(--info-foreground))]" />
            </div>
            <div>
              <p className="text-xs text-[hsl(var(--foreground-muted))]">Service</p>
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{apt.serviceName}</p>
            </div>
            <span className="ml-auto text-base font-bold font-tabular text-[hsl(var(--success-foreground))]">
              {formatCurrency(apt.price)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[hsl(var(--background-3))]">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[hsl(var(--foreground-muted))]" />
                <p className="text-xs text-[hsl(var(--foreground-muted))]">Date & Time</p>
              </div>
              <p className="text-sm font-medium text-[hsl(var(--foreground))]">{formatDate(apt.scheduledAt)}</p>
              <p className="text-xs text-[hsl(var(--foreground-subtle))]">{formatTime(apt.scheduledAt)}</p>
            </div>
            {apt.customer && (
              <div className="p-3 rounded-xl bg-[hsl(var(--background-3))]">
                <div className="flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-[hsl(var(--foreground-muted))]" />
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">Customer</p>
                </div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{apt.customer.name}</p>
                <p className="text-xs text-[hsl(var(--foreground-subtle))]">{apt.customer.phone}</p>
              </div>
            )}
          </div>

          {apt.staff && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white text-xs font-bold">
                {apt.staff.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{apt.staff.name}</p>
                <p className="text-xs text-[hsl(var(--foreground-muted))] capitalize">{apt.staff.role}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        {apt.customer?.phone && (
          <a
            href={`https://wa.me/${apt.customer.phone.replace(/\D/g, '')}?text=Hi ${apt.customer.name}, reminder for your ${apt.serviceName} appointment today!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="secondary" className="w-full">
              <MessageSquare className="w-4 h-4" /> WhatsApp Reminder
            </Button>
          </a>
        )}
        <Link href={`/appointments/${apt.id}/edit`} className="flex-1">
          <Button className="w-full">Edit</Button>
        </Link>
      </div>
    </div>
  )
}
