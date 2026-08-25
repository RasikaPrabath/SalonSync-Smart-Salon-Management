'use client'

import { useState } from 'react'
import { useToast } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Store, Phone, MapPin, Mail, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ProfileSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: 'My Salon',
    phone: '+94 77 123 4567',
    email: 'info@mysalon.lk',
    tagline: 'Premium Hair & Beauty Care',
    address: '123 Galle Road, Colombo 03',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    toast({ type: 'success', title: 'Profile updated!', description: 'Your salon information has been saved.' })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Left Column: Salon Preview & Identity */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-[hsl(var(--primary)/0.3)] to-[hsl(var(--primary-muted))] relative" />
          <CardContent className="pt-0 -mt-10 pb-5">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-[hsl(var(--card))] p-1 border-2 border-[hsl(var(--primary))] shadow-lg flex items-center justify-center mb-3">
                <div className="w-full h-full rounded-xl bg-[hsl(var(--primary-muted))] flex items-center justify-center text-[hsl(var(--primary))]">
                  <Store className="w-9 h-9" />
                </div>
              </div>
              <h3 className="font-bold text-base text-[hsl(var(--foreground))]">{form.name || 'Salon Name'}</h3>
              <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">{form.tagline || 'Salon & Spa'}</p>
              
              <div className="flex items-center gap-1.5 mt-3">
                <Badge variant="primary">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified Salon</span>
                </Badge>
              </div>

              <div className="w-full border-t border-[hsl(var(--border-subtle))] mt-4 pt-4 text-left space-y-2.5">
                {form.phone && (
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--foreground-muted))]">
                    <Phone className="w-3.5 h-3.5 text-[hsl(var(--primary))] shrink-0" />
                    <span className="truncate">{form.phone}</span>
                  </div>
                )}
                {form.email && (
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--foreground-muted))]">
                    <Mail className="w-3.5 h-3.5 text-[hsl(var(--primary))] shrink-0" />
                    <span className="truncate">{form.email}</span>
                  </div>
                )}
                {form.address && (
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--foreground-muted))]">
                    <MapPin className="w-3.5 h-3.5 text-[hsl(var(--primary))] shrink-0" />
                    <span className="truncate">{form.address}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tip Card */}
        <div className="p-4 rounded-xl bg-[hsl(var(--primary-muted))] border border-[hsl(var(--primary)/0.2)]">
          <div className="flex gap-2.5">
            <Sparkles className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
            <p className="text-xs text-[hsl(var(--foreground-muted))] leading-relaxed">
              Your salon details appear on customer invoices, appointment reminders, and receipts.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Edit Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[hsl(var(--primary-muted))] flex items-center justify-center">
                <Store className="w-5 h-5 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <CardTitle>Salon Information</CardTitle>
                <CardDescription>Update your salon's business and contact details.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Salon Name"
                    required
                    value={form.name}
                    placeholder="e.g. Elegance Salon & Spa"
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  />
                </div>

                <div>
                  <Input
                    label="Business Phone"
                    type="tel"
                    value={form.phone}
                    placeholder="e.g. +94 77 123 4567"
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Input
                    label="Business Email"
                    type="email"
                    value={form.email}
                    placeholder="e.g. info@mysalon.lk"
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    label="Tagline / Slogan"
                    value={form.tagline}
                    placeholder="e.g. Premium Hair & Beauty Care"
                    onChange={e => setForm(p => ({ ...p, tagline: e.target.value }))}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Textarea
                    label="Salon Address"
                    value={form.address}
                    placeholder="e.g. 123 Galle Road, Colombo 03"
                    onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" loading={loading} className="w-full sm:w-auto px-6">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

