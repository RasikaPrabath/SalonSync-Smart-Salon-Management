import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, MessageSquare, History, Calendar as CalendarIcon, Clock, Mail } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Badge } from '@/components/ui/badge'

export default async function CustomerProfilePage({
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
      },
    }
  )

  const { data: customer } = await supabase.from('customers').select('*').eq('id', id).single()
  
  if (!customer) notFound()

  // Match appointments by customer_name (since there's no foreign key yet)
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('customer_name', customer.name)
    .order('date', { ascending: false })

  const customerAppointments = appointments || []

  // Stats
  const totalSpent = customerAppointments
    .filter(a => a.status === 'Completed')
    .reduce((sum, a) => sum + Number(a.price), 0)
    
  const noShows = customerAppointments.filter(a => a.status === 'no-show').length

  return (
    <div className="max-w-2xl mx-auto w-full space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/customers"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">{customer.name}</h1>
      </div>

      {/* Profile */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary))] flex items-center justify-center text-white text-2xl font-bold">
              {customer.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[hsl(var(--foreground))]">{customer.name}</h2>
              <div className="flex flex-col gap-1 mt-1">
                {customer.phone && (
                  <a href={`tel:${customer.phone}`} className="text-sm text-[hsl(var(--primary))] hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />{customer.phone}
                  </a>
                )}
                {customer.email && (
                  <a href={`mailto:${customer.email}`} className="text-sm text-[hsl(var(--foreground-muted))] hover:underline flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />{customer.email}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[hsl(var(--border-subtle))]">
            <div className="text-center">
              <p className="text-lg font-bold text-[hsl(var(--foreground))]">{customerAppointments.length}</p>
              <p className="text-caption mt-0.5">Visits</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold font-tabular text-[hsl(var(--success-foreground))]">
                {formatCurrency(totalSpent)}
              </p>
              <p className="text-caption mt-0.5">Total Spent</p>
            </div>
            <div className="text-center">
              <p className={`text-lg font-bold ${noShows > 0 ? 'text-[hsl(var(--danger-foreground))]' : 'text-[hsl(var(--foreground))]'}`}>
                {noShows}
              </p>
              <p className="text-caption mt-0.5">No-shows</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      {customer.phone && (
        <div className="flex gap-3">
          <a href={`tel:${customer.phone}`} className="flex-1">
            <Button variant="secondary" className="w-full"><Phone className="w-4 h-4" /> Call</Button>
          </a>
          <a href={`https://wa.me/${customer.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="secondary" className="w-full"><MessageSquare className="w-4 h-4" /> WhatsApp</Button>
          </a>
        </div>
      )}

      {/* Appointment history */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-4 h-4" /> Appointment History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 pt-2">
          {customerAppointments.length > 0 ? (
            customerAppointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between py-3 border-b border-[hsl(var(--border-subtle))] last:border-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{apt.service}</p>
                    <Badge variant={apt.status === 'Completed' ? 'success' : apt.status === 'no-show' ? 'danger' : 'info'}>
                      {apt.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[hsl(var(--foreground-muted))] flex items-center gap-2">
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {formatDate(apt.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.time}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold font-tabular text-[hsl(var(--foreground))]">
                    {formatCurrency(apt.price)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-sm text-[hsl(var(--foreground-muted))]">
              No appointments found for this customer.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
