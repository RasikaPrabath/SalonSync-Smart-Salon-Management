import { Users, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function TeamSettingsPage() {
  return (
    <div className="max-w-xl">
      <Card>
        <CardContent className="py-12 text-center">
          <div className="w-14 h-14 rounded-xl bg-[hsl(var(--info-bg))] flex items-center justify-center mx-auto mb-3">
            <Users className="w-7 h-7 text-[hsl(var(--info-foreground))]" />
          </div>
          <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">Team Management</h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] max-w-xs mx-auto mb-4">
            Invite staff, assign roles, and manage permissions. Coming in Phase 2.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(var(--info-bg))] text-[hsl(var(--info-foreground))] text-xs font-medium">
            <Zap className="w-3 h-3" /> Phase 2
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
