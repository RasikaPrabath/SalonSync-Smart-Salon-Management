import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, MessageSquare, TrendingUp } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function StaffProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      }
    }
  )

  const { data: staff } = await supabase.from('staff').select('*').eq('id', id).single()
  if (!staff) notFound()

  // In the real schema, appointments doesn't have a staffId column yet,
  // but if we assume they are related, or we just show 0 for now since we haven't mapped staff to appointments.
  // Wait, does appointments have a staff column?
  // Our schema.sql: appointments(id, customer_name, service, date, time, status, price)
  // No staff assignment in schema yet!
  // For now, we will just show empty array.
  const staffAppointments: any[] = []
  
  const totalRevenue = staffAppointments.reduce((sum, a) => sum + Number(a.price), 0)
  const commission = (totalRevenue * Number(staff.commission_rate)) / 100

  return (
    <div className="max-w-2xl mx-auto w-full space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/staff"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">{staff.name}</h1>
        <Badge variant={staff.role === 'owner' ? 'primary' : 'info'} className="ml-auto">
          {staff.role === 'owner' ? 'Owner' : 'Staff'}
        </Badge>
      </div>

      {/* Profile */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary))] flex items-center justify-center text-white text-2xl font-bold">
              {staff.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[hsl(var(--foreground))]">{staff.name}</h2>
              {staff.phone && (
                <a href={`tel:${staff.phone}`} className="text-sm text-[hsl(var(--primary))] hover:underline flex items-center gap-1 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />{staff.phone}
                </a>
              )}
            </div>
          </div>

          {/* Commission stats */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[hsl(var(--border-subtle))]">
            <div className="text-center">
              <p className="text-lg font-bold font-tabular text-[hsl(var(--success-foreground))]">
                {formatCurrency(totalRevenue)}
              </p>
              <p className="text-caption mt-0.5">Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-[hsl(var(--foreground))]">{staff.commission_rate}%</p>
              <p className="text-caption mt-0.5">Commission</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold font-tabular text-[hsl(var(--warning-foreground))]">
                {formatCurrency(commission)}
              </p>
              <p className="text-caption mt-0.5">Earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      {staff.phone && (
        <div className="flex gap-3">
          <a href={`tel:${staff.phone}`} className="flex-1">
            <Button variant="secondary" className="w-full"><Phone className="w-4 h-4" /> Call</Button>
          </a>
          <a href={`https://wa.me/${staff.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="secondary" className="w-full"><MessageSquare className="w-4 h-4" /> WhatsApp</Button>
          </a>
        </div>
      )}

      {/* Appointment history */}
      {staffAppointments.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Services Delivered
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 pt-2">
            {staffAppointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between py-3 border-b border-[hsl(var(--border-subtle))] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">{apt.serviceName}</p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">
                    {apt.customer?.name ?? 'Walk-in'} · {formatDate(apt.scheduledAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold font-tabular text-[hsl(var(--success-foreground))]">
                    {formatCurrency(apt.price)}
                  </p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">
                    +{formatCurrency((apt.price * Number(staff.commission_rate)) / 100)} comm.
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-8">
           <p className="text-sm text-[hsl(var(--foreground-muted))]">No services delivered yet.</p>
        </div>
      )}
    </div>
  )
}
