'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error
  console.error = (...args: unknown[]) => {
    const msg = args.map(a => String(a)).join(' ')
    if (msg.includes('Encountered a script tag')) return
    if (msg.includes('bis_skin_checked')) return
    orig.apply(console, args)
  }
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
