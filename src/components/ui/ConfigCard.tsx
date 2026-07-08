import { Link } from 'react-router-dom'
import { type LucideIcon } from 'lucide-react'

type ConfigCardProps = {
  title: string
  description: string
  icon: LucideIcon
  href?: string
  actionLabel?: string
  badge?: string
  onAction?: () => void
  className?: string
}

export function ConfigCard({
  title,
  description,
  icon: Icon,
  href,
  actionLabel = 'Manage',
  badge,
  onAction,
  className = '',
}: ConfigCardProps) {
  const content = (
    <div className={`group rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-slate-900 p-3 text-white">
          <Icon className="h-6 w-6" />
        </div>
        {badge && (
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </div>

      {href ? (
        <Link
          to={href}
          className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-slate-700"
        >
          {actionLabel}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-slate-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )

  return content
}
