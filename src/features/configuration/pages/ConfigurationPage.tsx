import { useEffect, useState } from 'react'
import { BookOpenCheck, CalendarCheck2, CheckCircle2, Download, FileText, Palette, ShieldCheck, Sparkles, ToggleRight, type LucideIcon } from 'lucide-react'
import { Compass } from 'lucide-react'
import { EmptyState } from '../../../shared/ui/EmptyState'
import { FormSection } from '../../../shared/ui/FormSection'
import { PageHeader } from '../../../shared/ui/PageHeader'
import { Skeleton } from '../../../shared/ui/Skeleton'
import { useToast } from '../../../shared/ui/ToastProvider'

type ConfigCardItem = {
  title: string
  description: string
  icon: LucideIcon
  href: string
  stat: string
}

const configCards: ConfigCardItem[] = [
  {
    title: 'Academic Rules',
    description: 'Review institutional policies and academic governance settings.',
    icon: BookOpenCheck,
    href: '/settings/academic-rules',
    stat: '12 Settings',
  },
  {
    title: 'Attendance Rules',
    description: 'Manage attendance thresholds and compliance expectations.',
    icon: CalendarCheck2,
    href: '/settings/attendance-rules',
    stat: '8 Policies',
  },
  {
    title: 'Feature Flags',
    description: 'Enable or disable platform capabilities without deployment changes.',
    icon: ToggleRight,
    href: '/settings/feature-flags',
    stat: '15 Active Flags',
  },
  {
    title: 'Branding',
    description: 'Adjust the visual identity and campus experience details.',
    icon: Palette,
    href: '/settings/branding',
    stat: 'Theme Active',
  },
]

const overviewItems = [
  'Academic standards and grading policies',
  'Attendance thresholds and compliance monitoring',
  'Feature rollout controls for platform modules',
  'Institution branding and visual identity updates',
]

const statusItems = [
  { label: 'Core settings', value: 'Synced' },
  { label: 'Last review', value: '2 hours ago' },
  { label: 'Pending changes', value: '0' },
]

export default function ConfigurationPage() {
  const { pushToast } = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 shadow-sm">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-4 h-8 w-72" />
          <Skeleton className="mt-3 h-4 w-96" />
          <div className="mt-6 flex flex-wrap gap-3">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-3 h-7 w-16" />
              <Skeleton className="mt-3 h-4 w-full" />
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-6 w-44" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-6 w-28" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (configCards.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Configuration Center"
          title="Manage core university settings"
          description="This workspace centralizes the most important governance controls without duplicating the global navigation."
        />
        <EmptyState
          icon={Compass}
          title="No Configuration Found"
          description="There is no configuration data available yet. Create settings to begin managing your university setup."
          actionLabel="Create Configuration"
          onAction={() => pushToast('Configuration placeholder created.')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.7)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <PageHeader
              eyebrow="Configuration Center"
              title="Manage core university settings"
              description="This workspace centralizes the most important governance controls without duplicating the global navigation."
            />
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1">Last Updated: 2 hours ago</span>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200 ring-1 ring-emerald-400/30">
                Configuration Status: Healthy
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              <Download className="h-4 w-4" />
              Export Settings
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/70 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-700">
              <FileText className="h-4 w-4" />
              View Audit Logs
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {configCards.map((card) => {
          const Icon = card.icon

          return (
            <div
              key={card.title}
              className="group rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-white/10 p-2.5 text-slate-100">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">{card.stat}</span>
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">{card.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <FormSection className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-900 p-3 text-white shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Configuration overview</h3>
              <p className="text-sm text-slate-600">Everything relevant to university administration is grouped here.</p>
            </div>
          </div>

          <ul className="space-y-3">
            {overviewItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-900" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FormSection>

        <FormSection className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-900 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Status</h3>
              <p className="text-sm text-slate-600">Current readiness snapshot</p>
            </div>
          </div>

          <div className="space-y-3">
            {statusItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 shadow-sm">
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className="text-sm font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </FormSection>
      </div>
    </div>
  )
}
