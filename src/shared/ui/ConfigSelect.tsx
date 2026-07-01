import { type SelectHTMLAttributes, type ReactNode } from 'react'

type ConfigSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  helpText?: string
  children: ReactNode
}

export function ConfigSelect({ label, error, helpText, className = '', children, ...props }: ConfigSelectProps) {
  return (
    <label className="block space-y-2.5">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select
        {...props}
        className={`w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 ${className}`}
      >
        {children}
      </select>
      {helpText && <p className="text-xs leading-5 text-slate-500">{helpText}</p>}
      {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
    </label>
  )
}
