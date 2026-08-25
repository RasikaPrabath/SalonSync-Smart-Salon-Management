'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Helper to create server client securely
async function getServerSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options })
        },
      },
    }
  )
}

export async function getExpenses() {
  try {
    const supabase = await getServerSupabase()
    
    // Auth check
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Unauthorized')

    // Fetch expenses ordered by created_at desc
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (err: any) {
    console.error('Error fetching expenses:', err)
    return { data: [], error: err.message }
  }
}

export async function addExpense(amount: number, category: string, note: string) {
  try {
    const supabase = await getServerSupabase()
    
    // Auth check
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Unauthorized')

    // Since the database only has a description column, we embed the category in it
    const formattedDescription = note ? `[${category}] ${note}` : `[${category}] Expense`

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        amount: Number(amount),
        description: formattedDescription,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath('/expenses')
    revalidatePath('/dashboard')
    revalidatePath('/insights')
    return { data, error: null }
  } catch (err: any) {
    console.error('Error adding expense:', err)
    return { data: null, error: err.message }
  }
}
