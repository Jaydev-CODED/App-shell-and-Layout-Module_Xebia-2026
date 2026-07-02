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
        <div className="rounded-xl p-6" style={{ border: '1px solid #e9e9ec', background: '#fff' }}>
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
            <div key={index} className="rounded-xl p-5" style={{ border: '1px solid #e9e9ec', background: '#fff' }}>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-3 h-7 w-16" />
              <Skeleton className="mt-3 h-4 w-full" />
            </div>
          ))}
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
          description="This workspace centralizes the most important governance controls."
        />
        <EmptyState
          icon={Compass}
          title="No Configuration Found"
          description="There is no configuration data available yet."
          actionLabel="Create Configuration"
          onAction={() => pushToast('Configuration placeholder created.')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="rounded-xl bg-white p-6 sm:p-8" style={{ border: '1px solid #e9e9ec' }}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <PageHeader
              eyebrow="Configuration Center"
              title="Manage core university settings"
              description="This workspace centralizes the most important governance controls without duplicating the global navigation."
            />
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ border: '1px solid #e9e9ec', color: '#4e434e', background: '#f9f9fc' }}
              >
                Last Updated: 2 hours ago
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: 'rgba(154,46,157,0.08)', color: '#9a2e9d' }}
              >
                Configuration Status: Healthy
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#5c1d67' }}
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Export Settings
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all hover:bg-[#f3f3f6]"
              style={{ border: '1px solid #e9e9ec', background: '#fff', color: '#1a1c1e' }}
            >
              <FileText className="h-4 w-4" strokeWidth={1.5} />
              View Audit Logs
            </button>
          </div>
        </div>
      </div>

      {/* Config Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {configCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="group rounded-xl bg-white p-5 transition-all cursor-pointer hover:-translate-y-0.5"
              style={{ border: '1px solid #e9e9ec' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(92,29,103,0.08)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="rounded-lg p-2"
                  style={{ background: 'rgba(154,46,157,0.08)' }}
                >
                  <Icon className="h-5 w-5" style={{ color: '#5c1d67' }} strokeWidth={1.5} />
                </div>
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: '#9a2e9d', letterSpacing: '0.06em' }}
                >
                  {card.stat}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold" style={{ color: '#1a1c1e' }}>
                {card.title}
              </p>
              <p className="mt-1.5 text-sm leading-5" style={{ color: '#4e434e' }}>
                {card.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Overview + Status */}
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <FormSection className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2.5" style={{ background: '#f3e8f5' }}>
              <ShieldCheck className="h-5 w-5" style={{ color: '#5c1d67' }} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-semibold" style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}>
                Configuration Overview
              </h3>
              <p className="text-sm" style={{ color: '#4e434e' }}>
                Everything relevant to university administration is grouped here.
              </p>
            </div>
          </div>

          <ul className="space-y-2">
            {overviewItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg px-4 py-3 text-sm"
                style={{ border: '1px solid #e9e9ec', background: '#f9f9fc', color: '#1a1c1e' }}
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#5c1d67' }} strokeWidth={1.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FormSection>

        <FormSection className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2.5" style={{ background: '#f3f3f6' }}>
              <Sparkles className="h-5 w-5" style={{ color: '#4e434e' }} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-semibold" style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}>
                Status
              </h3>
              <p className="text-sm" style={{ color: '#4e434e' }}>Current readiness snapshot</p>
            </div>
          </div>

          <div className="space-y-2">
            {statusItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg px-4 py-3"
                style={{ border: '1px solid #e9e9ec', background: '#f9f9fc' }}
              >
                <span className="text-sm" style={{ color: '#4e434e' }}>{item.label}</span>
                <span className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </FormSection>
      </div>
    </div>
  )
}
