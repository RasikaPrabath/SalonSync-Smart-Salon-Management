const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  const [{ data: sales, error: err1 }, { data: expenses, error: err2 }, { data: appointments, error: err3 }, { data: inventory, error: err4 }] = await Promise.all([
    supabase.from('sales').select('amount, date').gte('date', new Date(new Date().setDate(1)).toISOString()),
    supabase.from('expenses').select('amount, date').gte('date', new Date(new Date().setDate(1)).toISOString()),
    supabase.from('appointments').select('*').gte('date', new Date(new Date().setDate(1)).toISOString()),
    supabase.from('inventory').select('name, stock, min_stock')
  ])

  console.log('err1', err1)
  console.log('err2', err2)
  console.log('err3', err3)
  console.log('err4', err4)
}

test()
