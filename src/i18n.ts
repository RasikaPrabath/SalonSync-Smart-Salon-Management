import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export const locales = ['en', 'si'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'si'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')?.value
  const locale = (locales.includes(localeCookie as Locale) ? localeCookie : defaultLocale) as Locale

  return {
    locale,
    messages: (await import(`./i18n/${locale}.json`)).default,
  }
})
