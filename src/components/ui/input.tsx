import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[hsl(var(--foreground))]"
          >
            {label}
            {props.required && <span className="text-[hsl(var(--danger-foreground))] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground-muted))] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 rounded-xl border text-sm transition-all duration-150',
              'bg-[hsl(var(--input))] border-[hsl(var(--border))] text-[hsl(var(--input-foreground))]',
              'placeholder:text-[hsl(var(--input-placeholder))]',
              'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-0 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon ? 'pl-10 pr-4' : 'px-4',
              rightIcon ? 'pr-10' : '',
              error && 'border-[hsl(var(--danger))] focus:ring-[hsl(var(--danger)/0.4)]',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground-muted))]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-[hsl(var(--danger-foreground))]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[hsl(var(--foreground-subtle))]">{hint}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[hsl(var(--foreground))]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full min-h-[80px] rounded-xl border text-sm transition-all duration-150 resize-none px-4 py-3',
            'bg-[hsl(var(--input))] border-[hsl(var(--border))] text-[hsl(var(--input-foreground))]',
            'placeholder:text-[hsl(var(--input-placeholder))]',
            'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-0 focus:border-transparent',
            error && 'border-[hsl(var(--danger))]',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[hsl(var(--danger-foreground))]">{error}</p>}
        {hint && !error && <p className="text-xs text-[hsl(var(--foreground-subtle))]">{hint}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[hsl(var(--foreground))]">
            {label}
            {props.required && <span className="text-[hsl(var(--danger-foreground))] ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-10 rounded-xl border text-sm transition-all duration-150 px-4',
            'bg-[hsl(var(--input))] border-[hsl(var(--border))] text-[hsl(var(--input-foreground))]',
            'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-0 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-[hsl(var(--danger))]',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-[hsl(var(--danger-foreground))]">{error}</p>}
        {hint && !error && <p className="text-xs text-[hsl(var(--foreground-subtle))]">{hint}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
