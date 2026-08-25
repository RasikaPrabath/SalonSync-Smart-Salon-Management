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
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  )
}

export async function getInventory() {
  const supabase = await getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { data: null, error: 'Unauthorized' }

  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching inventory:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function addInventoryItem(formData: FormData) {
  const supabase = await getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { error: 'Unauthorized' }

  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const price = Number(formData.get('price'))
  const stock = Number(formData.get('stock'))
  const min_stock = Number(formData.get('minStock'))

  const { error } = await supabase
    .from('inventory')
    .insert([{
      name,
      category,
      price,
      stock,
      min_stock
    }])

  if (error) {
    console.error('Error adding inventory item:', error)
    return { error: error.message }
  }

  revalidatePath('/inventory')
  revalidatePath('/dashboard') // Dashboard uses inventory for low stock alerts
  revalidatePath('/insights')
  
  return { success: true }
}
