import { useEffect, useState } from 'react'
import { Sparkles, ToggleLeft } from 'lucide-react'
import { EmptyState } from '../../../shared/ui/EmptyState'
import { PageHeader } from '../../../shared/ui/PageHeader'
import { Skeleton } from '../../../shared/ui/Skeleton'
import { ToggleSwitch } from '../../../shared/ui/ToggleSwitch'
import { useToast } from '../../../shared/ui/ToastProvider'

type ModuleFlag = {
  name: string
  description: string
  enabled: boolean
}

const initialModules: ModuleFlag[] = [
  { name: 'Placement', description: 'Controls placement portal visibility and student access.', enabled: true },
  { name: 'Student', description: 'Manages student portal features and profile tools.', enabled: true },
  { name: 'Faculty', description: 'Enables faculty management and workload dashboards.', enabled: false },
  { name: 'Library', description: 'Controls catalog, reservation, and borrowing workflows.', enabled: true },
  { name: 'Transport', description: 'Handles bus tracking and transport request automation.', enabled: false },
  { name: 'Hostel', description: 'Enables hostel room allocation and accommodation controls.', enabled: true },
  { name: 'Examination', description: 'Controls exam scheduling and result management flows.', enabled: true },
]

export default function FeatureFlagsPage() {
  const { pushToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [modules, setModules] = useState(initialModules)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800)
    return () => window.clearTimeout(timer)
  }, [])

  const toggleModule = (index: number) => {
    setModules((current) =>
      current.map((module, moduleIndex) =>
        moduleIndex === index ? { ...module, enabled: !module.enabled } : module,
      ),
    )

    const updatedModule = modules[index]
    pushToast(`${updatedModule.name} module ${updatedModule.enabled ? 'disabled' : 'enabled'}.`)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="space-y-3">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-7 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (modules.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Feature Management"
          title="Feature Flags"
          description="Enable or disable platform modules for different rollout stages."
        />
        <EmptyState
          icon={ToggleLeft}
          title="No Feature Flags"
          description="No feature flags are available yet. Add a module to enable rollout controls."
          actionLabel="Create Flag"
          onAction={() => pushToast('Feature flag placeholder created.')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature Management"
        title="Feature Flags"
        description="Enable or disable platform modules for different rollout stages."
      />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {modules.map((module, index) => (
          <div
            key={module.name}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-slate-500" />
                  <h3 className="text-base font-semibold text-slate-900">{module.name} Module</h3>
                </div>
                <p className="text-sm text-slate-600">{module.description}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  module.enabled
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                    : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
                }`}
              >
                {module.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-3">
              <div>
                <p className="text-sm font-medium text-slate-700">Module Status</p>
                <p className="text-xs text-slate-500">{module.enabled ? 'Live for users' : 'Paused for rollout'}</p>
              </div>

              <ToggleSwitch
                checked={module.enabled}
                onChange={() => toggleModule(index)}
                label=""
                description=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
