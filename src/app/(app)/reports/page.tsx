import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReportsClient } from './reports-client'

export default async function ReportsPage() {
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

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/login')
  }

  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
  const cutoffIso = ninetyDaysAgo.toISOString()

  const [salesRes, expensesRes] = await Promise.all([
    supabase.from('sales').select('amount, date, service').gte('date', cutoffIso),
    supabase.from('expenses').select('amount, date, category, description').gte('date', cutoffIso)
  ])

  return <ReportsClient sales={salesRes.data || []} expenses={expensesRes.data || []} />
}
