import { useEffect, useState } from 'react'
import { ToggleLeft } from 'lucide-react'
import { EmptyState } from '../../../shared/ui/EmptyState'
import { PageHeader } from '../../../shared/ui/PageHeader'
import { Skeleton } from '../../../shared/ui/Skeleton'
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
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl p-5" style={{ border: '1px solid #e9e9ec', background: '#fff' }}>
              <Skeleton className="h-5 w-28" />
              <Skeleton className="mt-3 h-4 w-full" />
              <div className="mt-5 flex items-center justify-between">
                <Skeleton className="h-8 w-20" />
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

      <div className="grid gap-4 lg:grid-cols-2">
        {modules.map((module, index) => (
          <div
            key={module.name}
            className="rounded-xl bg-white p-5 transition-all"
            style={{ border: '1px solid #e9e9ec' }}
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>
                  {module.name} Module
                </h3>
                <p className="text-sm" style={{ color: '#4e434e' }}>
                  {module.description}
                </p>
              </div>

              {/* Status chip */}
              <span
                className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={
                  module.enabled
                    ? { background: 'rgba(18,168,157,0.1)', color: '#12a89d' }
                    : { background: '#e9e9ec', color: '#4e434e' }
                }
              >
                {module.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            {/* Toggle row */}
            <div
              className="mt-4 flex items-center justify-between rounded-lg px-4 py-3"
              style={{ background: '#f9f9fc', border: '1px solid #e9e9ec' }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: '#1a1c1e' }}>
                  Module Status
                </p>
                <p className="text-xs" style={{ color: '#80737f' }}>
                  {module.enabled ? 'Live for users' : 'Paused for rollout'}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={module.enabled}
                onClick={() => toggleModule(index)}
                className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-all duration-200"
                style={{ background: module.enabled ? '#9a2e9d' : '#d2c2cf' }}
              >
                <span
                  className="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{ transform: module.enabled ? 'translateX(22px)' : 'translateX(4px)' }}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
