'use client'

import { useState } from 'react'
import { Users, UserPlus, Trash2, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toaster'

export function TeamSettingsClient({ staff }: { staff: any[] }) {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    toast({ type: 'success', title: 'Invite sent!', description: `An invite was sent to ${email}` })
    setEmail('')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Current team */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[hsl(var(--primary))]" /> Team Members
                </CardTitle>
                <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">
                  Manage staff accounts and permissions.
                </p>
              </div>
              <Badge variant="primary">{staff.length} {staff.length === 1 ? 'Member' : 'Members'}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-0 pt-2">
            {staff.map(member => (
              <div key={member.id} className="flex items-center gap-3 py-3.5 border-b border-[hsl(var(--border-subtle))] last:border-0">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{member.name}</p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">{member.phone ?? 'No phone'}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={member.role === 'owner' ? 'primary' : 'info'}>
                    {member.role === 'owner' ? (
                      <span className="flex items-center gap-1"><Crown className="w-3 h-3" /> Owner</span>
                    ) : 'Staff'}
                  </Badge>
                  {member.role !== 'owner' && (
                    <button
                      onClick={() => toast({ type: 'warning', title: 'Not available', description: 'Cannot remove staff members in this demo.' })}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[hsl(var(--foreground-subtle))] hover:text-[hsl(var(--danger-foreground))] hover:bg-[hsl(var(--danger-bg))] transition-all"
                      aria-label="Remove staff"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {staff.length === 0 && (
              <div className="py-8 text-center text-sm text-[hsl(var(--foreground-muted))]">
                No team members found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Invite form */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[hsl(var(--primary))]" /> Invite Staff
            </CardTitle>
            <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">
              Add a new team member by email.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="space-y-3">
              <Input
                type="email"
                label="Email Address"
                placeholder="staff@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Button type="submit" loading={loading} className="w-full">
                Send Invite
              </Button>
            </form>
            <p className="text-xs text-[hsl(var(--foreground-subtle))] mt-4 leading-relaxed">
              They&apos;ll receive an invitation link to join your salon workspace and manage appointments.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
