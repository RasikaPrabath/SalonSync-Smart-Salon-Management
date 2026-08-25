import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardClient } from './dashboard-client'

export default async function DashboardPage() {
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

  // Calculate dates
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayIso = today.toISOString()
  
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6) // Include today + 6 past days = 7 days
  const sevenDaysAgoIso = sevenDaysAgo.toISOString()

  // Fetch data
  const [salesRes, expensesRes, appointmentsRes, inventoryRes] = await Promise.all([
    supabase.from('sales').select('amount, date').gte('date', sevenDaysAgoIso),
    supabase.from('expenses').select('amount, date').gte('date', sevenDaysAgoIso),
    supabase.from('appointments').select('*').gte('date', todayIso),
    supabase.from('inventory').select('*')
  ])

  const sales = salesRes.data || []
  const expenses = expensesRes.data || []
  const appointments = appointmentsRes.data || []
  const inventory = inventoryRes.data || []

  // Aggregate metrics
  const todaySales = sales.filter(s => new Date(s.date) >= today)
  const todayExpenses = expenses.filter(e => new Date(e.date) >= today)
  
  const todayRevenue = todaySales.reduce((sum, s) => sum + Number(s.amount), 0)
  const todayExpensesTotal = todayExpenses.reduce((sum, e) => sum + Number(e.amount), 0)
  
  const todayAppointments = appointments.filter(a => new Date(a.date).toDateString() === today.toDateString())

  // Weekly Trend
  const weeklyTrend = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const compareDate = d.toDateString()
    
    const dayRev = sales.filter(s => new Date(s.date).toDateString() === compareDate).reduce((sum, s) => sum + Number(s.amount), 0)
    const dayExp = expenses.filter(e => new Date(e.date).toDateString() === compareDate).reduce((sum, e) => sum + Number(e.amount), 0)
    
    weeklyTrend.push({
      date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      revenue: dayRev,
      expenses: dayExp
    })
  }

  const lowStockItems = inventory.filter(i => Number(i.stock) <= Number(i.min_stock))
  const upcomingAppointments = todayAppointments.filter(a => a.status === 'Upcoming')
  const noShowFollowUps = todayAppointments.filter(a => a.status === 'no-show')

  const metrics = {
    todayRevenue,
    todayExpenses: todayExpensesTotal,
    todayProfit: todayRevenue - todayExpensesTotal,
    todayAppointments: todayAppointments.length,
    weeklyTrend,
    needsAttention: {
      lowStockItems,
      upcomingAppointments,
      noShowFollowUps
    }
  }

  return <DashboardClient metrics={metrics} />
}
