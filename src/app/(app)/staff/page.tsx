import { getStaff } from '@/app/actions/staff'
import { redirect } from 'next/navigation'
import { StaffClient } from './staff-client'

export default async function StaffPage() {
  const { data, error } = await getStaff()

  if (error === 'Unauthorized') {
    redirect('/login')
  }

  return <StaffClient staff={data || []} />
}
