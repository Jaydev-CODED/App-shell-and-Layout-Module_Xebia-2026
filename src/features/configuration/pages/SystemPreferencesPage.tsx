import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Globe, RotateCcw } from 'lucide-react'
import { ConfigSelect } from '../../../shared/ui/ConfigSelect'
import { FormSection } from '../../../shared/ui/FormSection'
import { PageHeader } from '../../../shared/ui/PageHeader'
import { SaveButton } from '../../../shared/ui/SaveButton'
import { Skeleton } from '../../../shared/ui/Skeleton'
import { useToast } from '../../../shared/ui/ToastProvider'
import {
  systemPreferencesSchema,
  type SystemPreferencesFormValues,
} from '../schemas/systemPreferencesSchema'

// BRD dummy JSON defaults
const defaultValues: SystemPreferencesFormValues = {
  timeZone: 'Asia/Kolkata',
  dateFormat: 'DD-MM-YYYY',
  language: 'en-IN',
}

const timeZones = [
  { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST, UTC+5:30)' },
  { value: 'UTC', label: 'UTC (UTC+0:00)' },
  { value: 'America/New_York', label: 'America/New_York (EST, UTC-5:00)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST, UTC-8:00)' },
  { value: 'Europe/London', label: 'Europe/London (GMT, UTC+0:00)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (CET, UTC+1:00)' },
  { value: 'Asia/Dubai', label: 'Asia/Dubai (GST, UTC+4:00)' },
  { value: 'Asia/Singapore', label: 'Asia/Singapore (SGT, UTC+8:00)' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney (AEDT, UTC+11:00)' },
]

const languages = [
  { value: 'en-IN', label: 'English — India' },
  { value: 'en-US', label: 'English — US' },
  { value: 'en-GB', label: 'English — UK' },
  { value: 'hi-IN', label: 'Hindi — India' },
]

const dateFormats = [
  { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY', example: '31-12-2026' },
  { value: 'MM-DD-YYYY', label: 'MM-DD-YYYY', example: '12-31-2026' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2026-12-31' },
]

export default function SystemPreferencesPage() {
  const { pushToast } = useToast()
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SystemPreferencesFormValues>({
    resolver: zodResolver(systemPreferencesSchema as never),
    defaultValues,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800)
    return () => window.clearTimeout(timer)
  }, [])

  const onSubmit = (values: SystemPreferencesFormValues) => {
    console.info('System preferences saved', values)
    pushToast('System preferences saved successfully.')
  }

  const handleReset = () => {
    reset(defaultValues)
    pushToast('System preferences reset to defaults.')
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl p-6 space-y-4" style={{ border: '1px solid #e9e9ec', background: '#fff' }}>
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-80" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const selectedDateFormat = watch('dateFormat')

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform Preferences"
        title="System Preferences"
        description="Configure regional, language, and formatting defaults for the entire platform."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* ── Section 1: Regional Settings ── */}
        <FormSection>
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" style={{ color: '#5c1d67' }} strokeWidth={1.5} />
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
              >
                Regional Settings
              </h3>
            </div>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Set the time zone and display language for all users across the platform.
            </p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ConfigSelect
              label="Time Zone"
              error={errors.timeZone?.message}
              {...register('timeZone')}
            >
              {timeZones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </ConfigSelect>

            <ConfigSelect
              label="Language / Locale"
              error={errors.language?.message}
              {...register('language')}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </ConfigSelect>
          </div>
        </FormSection>

        {/* ── Section 2: Date Format ── */}
        <FormSection>
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
            >
              Date Formatting
            </h3>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Choose how dates are displayed in reports, tables, and throughout the portal.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {dateFormats.map((fmt) => {
              const isSelected = selectedDateFormat === fmt.value
              return (
                <label
                  key={fmt.value}
                  className="flex cursor-pointer items-center gap-4 rounded-xl px-5 py-4 transition-all"
                  style={{
                    border: isSelected ? '1.5px solid #5c1d67' : '1px solid #e9e9ec',
                    background: isSelected ? 'rgba(92,29,103,0.04)' : '#f9f9fc',
                  }}
                >
                  {/* Radio circle */}
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                    style={{
                      border: isSelected ? '5px solid #9a2e9d' : '1.5px solid #d2c2cf',
                    }}
                  />
                  <div className="flex flex-1 items-center justify-between gap-4">
                    <p className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>
                      {fmt.label}
                    </p>
                    <span
                      className="rounded-md px-2.5 py-1 text-xs font-medium font-mono"
                      style={{
                        background: isSelected ? 'rgba(92,29,103,0.08)' : '#e9e9ec',
                        color: isSelected ? '#5c1d67' : '#4e434e',
                      }}
                    >
                      e.g. {fmt.example}
                    </span>
                  </div>
                  <input
                    type="radio"
                    value={fmt.value}
                    className="sr-only"
                    {...register('dateFormat')}
                  />
                </label>
              )
            })}
          </div>
          {errors.dateFormat && (
            <p className="mt-2 text-xs font-medium" style={{ color: '#e5484d' }}>
              {errors.dateFormat.message}
            </p>
          )}
        </FormSection>

        {/* ── Action Bar ── */}
        <div
          className="flex flex-wrap items-center gap-3 rounded-xl px-5 py-4"
          style={{ border: '1px solid #e9e9ec', background: '#f9f9fc' }}
        >
          <SaveButton loading={isSubmitting} />

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:bg-[#f3f3f6]"
            style={{ border: '1px solid #e9e9ec', background: '#fff', color: '#1a1c1e' }}
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            Reset to Default
          </button>
        </div>
      </form>
    </div>
  )
}
