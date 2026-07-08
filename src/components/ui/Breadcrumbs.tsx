import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.to && !isLast ? (
                <Link to={item.to} className="font-medium text-slate-700 transition hover:text-slate-900">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-semibold text-slate-900' : 'text-slate-600'}>{item.label}</span>
              )}

              {!isLast && <ChevronRight className="h-4 w-4 text-slate-400" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
