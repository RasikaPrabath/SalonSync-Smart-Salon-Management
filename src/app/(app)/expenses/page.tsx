import { getExpenses } from '@/app/actions/expenses'
import { ExpensesClient } from './expenses-client'
import { redirect } from 'next/navigation'

export default async function ExpensesPage() {
  const { data, error } = await getExpenses()

  if (error === 'Unauthorized') {
    redirect('/login')
  }

  return <ExpensesClient expenses={data || []} />
}
