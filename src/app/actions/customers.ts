'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getServerSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
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
          } catch {
            // The "setAll" method was called from a Server Component.
          }
        },
      },
    }
  )
}

export async function getCustomers() {
  const supabase = await getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { data: null, error: 'Unauthorized' }

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching customers:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function addCustomer(formData: FormData) {
  const supabase = await getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { error: 'Unauthorized' }

  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string

  const { error } = await supabase
    .from('customers')
    .insert([{ name, phone, email }])

  if (error) {
    console.error('Error adding customer:', error)
    return { error: error.message }
  }

  revalidatePath('/customers')
  
  return { success: true }
}

