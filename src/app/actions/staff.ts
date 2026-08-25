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

export async function getStaff() {
  const supabase = await getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { data: null, error: 'Unauthorized' }

  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching staff:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function addStaffMember(formData: FormData) {
  const supabase = await getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { error: 'Unauthorized' }

  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const phone = formData.get('phone') as string
  const commission_rate = Number(formData.get('commission_rate')) || 0

  const { error } = await supabase
    .from('staff')
    .insert([{
      name,
      role,
      phone,
      commission_rate
    }])

  if (error) {
    console.error('Error adding staff:', error)
    return { error: error.message }
  }

  revalidatePath('/staff')
  revalidatePath('/appointments')
  
  return { success: true }
}

