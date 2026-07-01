import { type ReactNode } from 'react'

type FormSectionProps = {
  children: ReactNode
  className?: string
}

export function FormSection({ children, className = '' }: FormSectionProps) {
  return (
    <div className={`rounded-[24px] border border-slate-200 bg-white/95 p-6 shadow-[0_16px_50px_-24px_rgba(15,23,42,0.4)] sm:p-7 ${className}`}>
      {children}
    </div>
  )
}
