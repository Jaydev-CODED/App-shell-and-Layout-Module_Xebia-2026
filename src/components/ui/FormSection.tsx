import { type ReactNode } from 'react'

type FormSectionProps = {
  children: ReactNode
  className?: string
}

export function FormSection({ children, className = '' }: FormSectionProps) {
  return (
    <div
      className={`rounded-xl bg-white p-6 ${className}`}
      style={{ border: '1px solid #e9e9ec' }}
    >
      {children}
    </div>
  )
}
