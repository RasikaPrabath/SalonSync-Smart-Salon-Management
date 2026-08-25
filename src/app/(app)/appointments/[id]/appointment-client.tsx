'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, UserCircle, Phone, Calendar as CalendarIcon, Clock, MessageSquare, Tag } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { updateAppointmentStatus } from '@/app/actions/appointments'
import { useToast } from '@/components/ui/toaster'

export function AppointmentDetailClient({ apt }: { apt: any }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(apt.status)

  async function handleStatusUpdate(newStatus: string) {
    setLoading(true)
    const res = await updateAppointmentStatus(apt.id, newStatus)
    setLoading(false)
    
    if (res.error) {
      toast({ title: 'Error', description: res.error, type: 'error' })
    } else {
      setStatus(newStatus)
      toast({ title: 'Status Updated', description: `Appointment marked as ${newStatus}`, type: 'success' })
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/appointments"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-page-title">Appointment Details</h1>
        <Badge 
          variant={status === 'Completed' ? 'success' : status === 'no-show' ? 'danger' : 'info'} 
          className="ml-auto"
        >
          {status}
        </Badge>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Customer Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary-muted))] flex items-center justify-center shrink-0">
              <span className="text-[hsl(var(--primary))] font-bold text-lg">{apt.customer_name.charAt(0)}</span>
            </div>
            <div>
              <p className="font-bold text-[hsl(var(--foreground))] text-lg">{apt.customer_name}</p>
              <p className="text-sm text-[hsl(var(--foreground-muted))] mt-0.5">Customer</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[hsl(var(--border-subtle))]">
            <div>
              <p className="text-caption mb-1 flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5" /> Date</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{formatDate(apt.date)}</p>
            </div>
            <div>
              <p className="text-caption mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Time</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{apt.time}</p>
            </div>
            <div>
              <p className="text-caption mb-1 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Service</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{apt.service}</p>
            </div>
            <div>
              <p className="text-caption mb-1 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Est. Price</p>
              <p className="font-medium text-[hsl(var(--success-foreground))] font-tabular">{formatCurrency(apt.price)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {status === 'Upcoming' && (
          <div className="flex gap-3">
            <Button 
              className="flex-1" 
              onClick={() => handleStatusUpdate('Completed')}
              loading={loading}
            >
              Mark as Completed
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 text-[hsl(var(--danger-foreground))] hover:text-[hsl(var(--danger-foreground))] hover:bg-[hsl(var(--danger-bg))]"
              onClick={() => handleStatusUpdate('no-show')}
              loading={loading}
            >
              Mark No-Show
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
