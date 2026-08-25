import { getAppointments } from '@/app/actions/appointments'
import { redirect } from 'next/navigation'
import { AppointmentsClient } from './appointments-client'

export default async function AppointmentsPage() {
  const { data, error } = await getAppointments()

  if (error === 'Unauthorized') {
    redirect('/login')
  }

  return <AppointmentsClient appointments={data || []} />
}
