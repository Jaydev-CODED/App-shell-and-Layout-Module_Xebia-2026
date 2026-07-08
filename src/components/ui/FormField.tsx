import { type InputHTMLAttributes, type ReactNode } from 'react'

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>, 'type'> & {
  label: string
  error?: string
  helpText?: string
  type?: 'text' | 'number' | 'select'
  children?: ReactNode
}

export function FormField({
  label,
  error,
  helpText,
  className = '',
  type = 'text',
  children,
  ...props
}: FormFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {type === 'select' ? (
        <select
          {...props}
          className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 ${className}`}
        >
          {children}
        </select>
      ) : (
        <input
          {...props}
          type={type}
          className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 ${className}`}
        />
      )}
      {helpText && <p className="text-xs text-slate-500">{helpText}</p>}
      {error && <p className="text-sm text-rose-600">{error}</p>}
    </label>
  )
}
