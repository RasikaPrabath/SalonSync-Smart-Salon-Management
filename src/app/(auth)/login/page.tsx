'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleGoogleLogin = async () => {
    if (!supabase) return
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      console.error('Error logging in with Google:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Basic email login (fallback)
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })
      if (!error) {
        router.push('/dashboard')
      }
    } else {
      await new Promise(r => setTimeout(r, 800))
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome back to SalonSync</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          />
          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
          />
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-xs text-[hsl(var(--primary))] hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Sign In with Email
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[hsl(var(--border))]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[hsl(var(--card))] px-2 text-[hsl(var(--foreground-muted))]">
              Or continue with
            </span>
          </div>
        </div>

        <Button 
          variant="outline" 
          type="button" 
          disabled={loading} 
          onClick={handleGoogleLogin}
          className="w-full h-11"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </Button>
        <p className="text-center text-sm text-[hsl(var(--foreground-muted))] mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[hsl(var(--primary))] hover:underline font-medium">
            Create one
          </Link>
        </p>

        {/* Demo login hint */}
        <div className="mt-4 p-3 rounded-xl bg-[hsl(var(--background-3))] text-center">
          <p className="text-xs text-[hsl(var(--foreground-muted))]">
            <strong className="text-[hsl(var(--foreground))]">Demo mode</strong> — click Sign In to enter the dashboard
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
