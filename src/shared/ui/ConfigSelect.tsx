import { type SelectHTMLAttributes, type ReactNode } from 'react'

type ConfigSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  helpText?: string
  children: ReactNode
}

export function ConfigSelect({ label, error, helpText, className = '', children, ...props }: ConfigSelectProps) {
  return (
    <label className="block space-y-2">
      <span
        className="block text-xs font-medium"
        style={{ color: '#4e434e', fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </span>
      <select
        {...props}
        className={`w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all ${className}`}
        style={{
          border: '1px solid #e9e9ec',
          background: '#ffffff',
          color: '#1a1c1e',
          fontFamily: 'Inter, sans-serif',
          appearance: 'auto',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#5c1d67'
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(92, 29, 103, 0.15)'
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e9e9ec'
          e.currentTarget.style.boxShadow = 'none'
          props.onBlur?.(e)
        }}
      >
        {children}
      </select>
      {helpText && (
        <p className="text-xs leading-5" style={{ color: '#80737f' }}>
          {helpText}
        </p>
      )}
      {error && (
        <p className="text-xs font-medium" style={{ color: '#e5484d' }}>
          {error}
        </p>
      )}
    </label>
  )
}
