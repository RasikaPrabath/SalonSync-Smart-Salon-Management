import { getSales } from '@/app/actions/sales'
import { SalesClient } from './sales-client'
import { redirect } from 'next/navigation'

export default async function SalesPage() {
  const { data, error } = await getSales()

  if (error === 'Unauthorized') {
    redirect('/login')
  }

  return <SalesClient sales={data || []} />
}
