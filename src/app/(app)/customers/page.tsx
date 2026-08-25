import { getCustomers } from '@/app/actions/customers'
import { redirect } from 'next/navigation'
import { CustomersClient } from './customers-client'

export default async function CustomersPage() {
  const { data, error } = await getCustomers()

  // If the table doesn't exist yet, just render an empty list to avoid crashing
  if (error && error !== 'Unauthorized') {
    return <CustomersClient customers={[]} error="The 'customers' table has not been created in Supabase yet. Please run the SQL command provided in the walkthrough." />
  }

  if (error === 'Unauthorized') {
    redirect('/login')
  }

  return <CustomersClient customers={data || []} />
}
