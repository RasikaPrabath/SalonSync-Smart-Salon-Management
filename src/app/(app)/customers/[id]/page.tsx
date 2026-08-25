import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, MessageSquare, Calendar, DollarSign } from 'lucide-react'
import { DEMO_CUSTOMERS, DEMO_SALES, DEMO_APPOINTMENTS } from '@/lib/demo-data'
import { formatCurrency, formatDate, formatTime, getStatusChipClass } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function CustomerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const customer = DEMO_CUSTOMERS.find(c => c.id === id)
  if (!customer) notFound()

  const customerSales = DEMO_SALES.filter(s => s.customerId === customer.id)
  const customerAppointments = DEMO_APPOINTMENTS.filter(a => a.customerId === customer.id)
  const totalSpend = customerSales.reduce((sum, s) => sum + s.amount, 0)

  const statusVariant: Record<string, 'success' | 'info' | 'danger' | 'warning'> = {
    completed: 'success',
    booked: 'info',
    'no-show': 'danger',
    cancelled: 'warning',
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/customers">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <h1 className="text-page-title">{customer.name}</h1>
      </div>

      {/* Profile card */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary))] flex items-center justify-center text-white font-bold text-2xl shrink-0">
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[hsl(var(--foreground))]">{customer.name}</h2>
              {customer.phone && (
                <a
                  href={`tel:${customer.phone}`}
                  className="flex items-center gap-1.5 text-sm text-[hsl(var(--primary))] mt-1 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {customer.phone}
                </a>
              )}
              {customer.notes && (
                <p className="text-sm text-[hsl(var(--foreground-muted))] mt-2 bg-[hsl(var(--background-3))] rounded-lg p-2.5">
                  {customer.notes}
                </p>
              )}
            </div>
          </div>

          {/* Stat pills */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-[hsl(var(--border-subtle))]">
            <div className="text-center">
              <p className="text-lg font-bold font-tabular text-[hsl(var(--success-foreground))]">
                {formatCurrency(totalSpend)}
              </p>
              <p className="text-caption mt-0.5">Total Spend</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold font-tabular text-[hsl(var(--foreground))]">
                {customerSales.length + customerAppointments.length}
              </p>
              <p className="text-caption mt-0.5">Total Visits</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {formatDate(customer.createdAt)}
              </p>
              <p className="text-caption mt-0.5">Customer Since</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      {customer.phone && (
        <div className="flex gap-3">
          <a href={`tel:${customer.phone}`} className="flex-1">
            <Button variant="secondary" className="w-full" size="md">
              <Phone className="w-4 h-4" /> Call
            </Button>
          </a>
          <a
            href={`https://wa.me/${customer.phone.replace(/\D/g, '')}?text=Hi ${customer.name}!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="secondary" className="w-full" size="md">
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </Button>
          </a>
        </div>
      )}

      {/* Appointment history */}
      {customerAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-2">
            {customerAppointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between py-2 border-b border-[hsl(var(--border-subtle))] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">{apt.serviceName}</p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">
                    {formatDate(apt.scheduledAt)} at {formatTime(apt.scheduledAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusVariant[apt.status] ?? 'neutral'}>
                    {apt.status}
                  </Badge>
                  <span className="text-sm font-semibold font-tabular text-[hsl(var(--foreground))]">
                    {formatCurrency(apt.price)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Sales history */}
      {customerSales.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-2">
            {customerSales.slice(0, 10).map(sale => (
              <div key={sale.id} className="flex items-center justify-between py-2 border-b border-[hsl(var(--border-subtle))] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">{sale.note || 'Sale'}</p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">{formatDate(sale.createdAt)}</p>
                </div>
                <span className="text-sm font-bold font-tabular text-[hsl(var(--success-foreground))]">
                  {formatCurrency(sale.amount)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
