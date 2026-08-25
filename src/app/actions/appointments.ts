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

export async function getAppointments() {
  const supabase = await getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { data: null, error: 'Unauthorized' }

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true })

  if (error) {
    console.error('Error fetching appointments:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function addAppointment(formData: FormData) {
  const supabase = await getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { error: 'Unauthorized' }

  const customer_name = formData.get('customer_name') as string
  const service = formData.get('service') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const price = Number(formData.get('price')) || 0

  const { error } = await supabase
    .from('appointments')
    .insert([{
      customer_name,
      service,
      date,
      time,
      price,
      status: 'Upcoming'
    }])

  if (error) {
    console.error('Error adding appointment:', error)
    return { error: error.message }
  }

  revalidatePath('/appointments')
  revalidatePath('/dashboard')
  
  return { success: true }
}

export async function updateAppointmentStatus(id: string, status: string) {
  const supabase = await getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Error updating appointment:', error)
    return { error: error.message }
  }

  revalidatePath('/appointments')
  revalidatePath('/dashboard')
  
  return { success: true }
}

