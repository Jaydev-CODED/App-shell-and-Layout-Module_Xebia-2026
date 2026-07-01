import { type InputHTMLAttributes } from 'react'

type ConfigInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  helpText?: string
}

export function ConfigInput({ label, error, helpText, className = '', ...props }: ConfigInputProps) {
  return (
    <label className="block space-y-2.5">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        {...props}
        className={`w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 ${className}`}
      />
      {helpText && <p className="text-xs leading-5 text-slate-500">{helpText}</p>}
      {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
    </label>
  )
}
