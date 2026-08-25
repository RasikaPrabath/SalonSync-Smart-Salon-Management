'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateInsights(lang: 'en' | 'si') {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
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

    // Verify session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      throw new Error('Unauthorized')
    }

    // Fetch real data
    const [{ data: sales }, { data: expenses }, { data: appointments }, { data: inventory }] = await Promise.all([
      supabase.from('sales').select('amount, date').gte('date', new Date(new Date().setDate(1)).toISOString()), // this month
      supabase.from('expenses').select('amount, date').gte('date', new Date(new Date().setDate(1)).toISOString()),
      supabase.from('appointments').select('*').gte('date', new Date(new Date().setDate(1)).toISOString()),
      supabase.from('inventory').select('name, stock, min_stock')
    ])

    const totalRevenue = sales?.reduce((s, x) => s + Number(x.amount), 0) || 0
    const totalExpenses = expenses?.reduce((s, x) => s + Number(x.amount), 0) || 0
    const lowStockItems = inventory?.filter(i => i.stock <= i.min_stock) || []
    const noShows = appointments?.filter(a => a.status === 'no-show')?.length || 0

    const businessData = {
      thisMonthRevenue: totalRevenue,
      thisMonthExpenses: totalExpenses,
      thisMonthProfit: totalRevenue - totalExpenses,
      thisMonthAppointments: appointments?.length || 0,
      thisMonthNoShows: noShows,
      lowStockItems: lowStockItems.map(i => `${i.name} (Stock: ${i.stock})`),
    }

    // Call Gemini
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      systemInstruction: `You are an expert AI business analyst for a Salon. 
Analyze ONLY the provided data and generate a JSON response exactly matching this structure:
{
  "summary": "2-3 sentences summarizing the overall performance this month.",
  "highlights": [
    { "icon": "TrendingUp" | "TrendingDown" | "Users" | "CalendarDays", "type": "positive" | "negative" | "warning", "title": "Short title", "detail": "1 sentence explanation" }
  ],
  "tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4"]
}
CRITICAL RULES:
1. Do NOT invent, hallucinate, or guess any numbers, metrics, or trends (like "18% growth" or "4 new customers") that are not explicitly provided in the data.
2. If the data is empty or zero, state that there is not enough data yet.
3. Output ONLY valid JSON. Ensure "icon" is strictly one of the 4 specified options.
4. The output MUST be in ${lang === 'si' ? 'Sinhala language (සිංහල)' : 'English language'}.`,
    })

    const result = await model.generateContent(JSON.stringify(businessData))
    let responseText = result.response.text().trim()
    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '')
    }
    
    return {
      stats: businessData,
      insights: JSON.parse(responseText)
    }
  } catch (error) {
    console.error('AI Insights Error:', error)
    return { stats: null, insights: null }
  }
}

