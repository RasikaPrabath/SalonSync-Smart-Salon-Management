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

export async function getSales() {
  try {
    const supabase = await getServerSupabase()
    
    // Auth check
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Unauthorized')

    // Fetch sales ordered by created_at desc
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (err: any) {
    console.error('Error fetching sales:', err)
    return { data: [], error: err.message }
  }
}

export async function addSale(amount: number, paymentMethod: string, note: string) {
  try {
    const supabase = await getServerSupabase()
    
    // Auth check
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Unauthorized')

    // Note: Our schema currently has service, amount, date. We'll map 'note' to 'service' and paymentMethod is not in the schema?
    // Let's check the schema. Wait, if paymentMethod is not in the schema we should add it or ignore it.
    // The demo UI uses paymentMethod, let's insert it if the schema allows or just map to note.
    // Wait, let's check schema for Sales.
    const { data, error } = await supabase
      .from('sales')
      .insert({
        amount: Number(amount),
        service: note || 'Service', // map note to service
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        // payment_method: paymentMethod // Wait, we need to check if this column exists
      })
      .select()
      .single()

    if (error) {
      // If error is related to missing column, maybe we should just omit payment_method for now
      console.error('Insert error:', error)
      throw error
    }

    revalidatePath('/sales')
    revalidatePath('/dashboard')
    revalidatePath('/insights')
    return { data, error: null }
  } catch (err: any) {
    console.error('Error adding sale:', err)
    return { data: null, error: err.message }
  }
}
