import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'neutral'
  className?: string
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  const variantClass = {
    success: 'chip-success',
    danger: 'chip-danger',
    warning: 'chip-warning',
    info: 'chip-info',
    primary: 'chip-primary',
    neutral: 'bg-[hsl(var(--background-3))] text-[hsl(var(--foreground-muted))] border border-[hsl(var(--border))]',
  }[variant]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClass,
        className
      )}
    >
      {children}
    </span>
  )
}
