import type { Metadata } from 'next'
import { Geist, Geist_Mono, Noto_Sans_Sinhala } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import Script from 'next/script'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const notoSansSinhala = Noto_Sans_Sinhala({
  variable: '--font-sinhala',
  subsets: ['sinhala'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'SalonSync — Smart Salon Management',
    template: '%s | SalonSync',
  },
  description:
    'SalonSync helps Sri Lankan salon and barbershop owners track sales, expenses, appointments and customers — replacing paper notebooks with a world-class digital tool.',
  keywords: ['salon management', 'barbershop', 'Sri Lanka', 'sales tracking', 'appointments'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SalonSync',
  },
  openGraph: {
    title: 'SalonSync — Smart Salon Management',
    description: 'Track sales, expenses, and appointments for your salon or barbershop.',
    type: 'website',
  },
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/icon.svg',
  },
}

export const viewport = {
  themeColor: '#C2522B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSinhala.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>

        {/* PWA Service Worker Registration */}
        <Script
          id="pwa-sw-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
