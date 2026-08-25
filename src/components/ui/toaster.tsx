'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

interface ToastProps {
  id: string
  type?: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  onDismiss: (id: string) => void
}

function Toast({ id, type = 'info', title, description, onDismiss }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 4000)
    return () => clearTimeout(timer)
  }, [id, onDismiss])

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success-foreground))]" />,
    error: <AlertCircle className="w-4 h-4 text-[hsl(var(--danger-foreground))]" />,
    warning: <AlertTriangle className="w-4 h-4 text-[hsl(var(--warning-foreground))]" />,
    info: <Info className="w-4 h-4 text-[hsl(var(--info-foreground))]" />,
  }

  const classes = {
    success: 'border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success-bg))]',
    error: 'border-[hsl(var(--danger)/0.3)] bg-[hsl(var(--danger-bg))]',
    warning: 'border-[hsl(var(--warning)/0.3)] bg-[hsl(var(--warning-bg))]',
    info: 'border-[hsl(var(--info)/0.3)] bg-[hsl(var(--info-bg))]',
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border shadow-lg min-w-[280px] max-w-[360px]',
        'bg-[hsl(var(--card))] backdrop-blur-sm',
        'animate-in slide-in-from-right-full duration-300',
        classes[type]
      )}
    >
      <div className="mt-0.5 shrink-0">{icons[type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{title}</p>
        {description && (
          <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 text-[hsl(var(--foreground-subtle))] hover:text-[hsl(var(--foreground))] transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// ===================================================================
// Toast context
// ===================================================================

interface ToastItem {
  id: string
  type?: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
}

interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const toast = React.useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...item, id }])
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <Toast {...t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

// Simple standalone Toaster that uses the context
export function Toaster() {
  return null // ToastProvider handles rendering; this is a placeholder
}
