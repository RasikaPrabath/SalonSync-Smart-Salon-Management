import { notFound } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { AppointmentDetailClient } from './appointment-client'

export default async function AppointmentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { 
      cookies: { 
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {}
        }
      } 
    }
  )

  const { data: apt } = await supabase.from('appointments').select('*').eq('id', id).single()
  
  if (!apt) notFound()

  return <AppointmentDetailClient apt={apt} />
}
