import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ===================================================================
// Currency formatting — Sri Lankan Rupees
// ===================================================================

export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-LK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return `Rs. ${(amount / 1_000_000).toFixed(1)}M`
  }
  if (amount >= 1_000) {
    return `Rs. ${(amount / 1_000).toFixed(1)}K`
  }
  return formatCurrency(amount)
}

// ===================================================================
// Date formatting
// ===================================================================

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isToday(d)) return `Today, ${format(d, 'h:mm a')}`
  if (isYesterday(d)) return `Yesterday, ${format(d, 'h:mm a')}`
  return format(d, 'MMM d, yyyy')
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM d')
}

export function formatDateFull(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'EEEE, MMMM d, yyyy')
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'h:mm a')
}

export function formatRelative(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export function formatDateForInput(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm")
}

// ===================================================================
// Status helpers
// ===================================================================

export function getStatusChipClass(status: string): string {
  switch (status) {
    case 'completed':
      return 'chip-success'
    case 'booked':
      return 'chip-info'
    case 'no-show':
      return 'chip-danger'
    case 'cancelled':
      return 'chip-warning'
    default:
      return 'chip-info'
  }
}

export function getPaymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    cash: 'Cash',
    card: 'Card',
    bank_transfer: 'Bank Transfer',
    other: 'Other',
  }
  return labels[method] ?? method
}

export function getExpenseCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    supplies: 'Supplies',
    utilities: 'Utilities',
    rent: 'Rent',
    salary: 'Salary',
    equipment: 'Equipment',
    marketing: 'Marketing',
    other: 'Other',
  }
  return labels[category] ?? category
}
