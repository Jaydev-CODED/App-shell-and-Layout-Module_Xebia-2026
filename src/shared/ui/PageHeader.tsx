type PageHeaderProps = {
  eyebrow: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
      {description && <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">{description}</p>}
    </div>
  )
}
