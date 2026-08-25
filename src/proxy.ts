import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Demo mode: skip auth check
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false'
  if (isDemoMode) {
    return NextResponse.next()
  }

  // Auth guard (activated when NEXT_PUBLIC_DEMO_MODE=false)
  const publicRoutes = ['/', '/login', '/signup', '/onboarding', '/forgot-password', '/reset-password', '/pricing']
  const isPublic = publicRoutes.some(r => pathname === r || pathname.startsWith(r + '/'))
  const sessionCookie = request.cookies.get('sb-access-token')

  if (!isPublic && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|icons|manifest\\.json).*)'],
}
