import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bell, Mail, MessageSquare, RotateCcw, Smartphone } from 'lucide-react'
import { FormSection } from '../../../shared/ui/FormSection'
import { PageHeader } from '../../../shared/ui/PageHeader'
import { SaveButton } from '../../../shared/ui/SaveButton'
import { Skeleton } from '../../../shared/ui/Skeleton'
import { useToast } from '../../../shared/ui/ToastProvider'
import { ConfigInput } from '../../../shared/ui/ConfigInput'
import {
  notificationSettingsSchema,
  type NotificationSettingsFormValues,
} from '../schemas/notificationSettingsSchema'

// BRD dummy JSON defaults
const defaultValues: NotificationSettingsFormValues = {
  email: true,
  sms: false,
  push: true,
  feeReminderDays: 7,
}

type NotificationChannelProps = {
  icon: React.ReactNode
  label: string
  description: string
  checked: boolean
  onChange: (val: boolean) => void
  id: string
}

function NotificationChannel({ icon, label, description, checked, onChange, id }: NotificationChannelProps) {
  return (
    <div
      className="flex items-center justify-between rounded-xl px-5 py-4 transition-all"
      style={{
        border: checked ? '1.5px solid #9a2e9d' : '1px solid #e9e9ec',
        background: checked ? 'rgba(154,46,157,0.04)' : '#f9f9fc',
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{
            background: checked ? 'rgba(154,46,157,0.12)' : '#e9e9ec',
            color: checked ? '#9a2e9d' : '#4e434e',
          }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>
            {label}
          </p>
          <p className="text-xs" style={{ color: '#80737f' }}>
            {description}
          </p>
        </div>
      </div>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-all duration-200"
        style={{ background: checked ? '#9a2e9d' : '#d2c2cf' }}
      >
        <span
          className="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{ transform: checked ? 'translateX(22px)' : 'translateX(4px)' }}
        />
      </button>
    </div>
  )
}

export default function NotificationSettingsPage() {
  const { pushToast } = useToast()
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NotificationSettingsFormValues>({
    resolver: zodResolver(notificationSettingsSchema as never),
    defaultValues,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800)
    return () => window.clearTimeout(timer)
  }, [])

  const onSubmit = (values: NotificationSettingsFormValues) => {
    console.info('Notification settings saved', values)
    pushToast('Notification settings saved successfully.')
  }

  const handleReset = () => {
    reset(defaultValues)
    pushToast('Notification settings reset to defaults.')
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="rounded-xl p-6 space-y-4" style={{ border: '1px solid #e9e9ec', background: '#fff' }}>
          <Skeleton className="h-6 w-44" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
        <div className="rounded-xl p-6 space-y-4" style={{ border: '1px solid #e9e9ec', background: '#fff' }}>
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-16 w-full max-w-xs" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Communication Settings"
        title="Notification Settings"
        description="Enable or disable notification channels and configure fee reminder schedules."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* ── Section 1: Notification Channels ── */}
        <FormSection>
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" style={{ color: '#5c1d67' }} strokeWidth={1.5} />
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
              >
                Notification Channels
              </h3>
            </div>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Choose which channels are active for institutional communications.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <NotificationChannel
                  id="toggle-email"
                  icon={<Mail className="h-5 w-5" strokeWidth={1.5} />}
                  label="Email Notifications"
                  description="Send alerts and updates via institutional email addresses."
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="sms"
              control={control}
              render={({ field }) => (
                <NotificationChannel
                  id="toggle-sms"
                  icon={<MessageSquare className="h-5 w-5" strokeWidth={1.5} />}
                  label="SMS Notifications"
                  description="Send urgent alerts to registered mobile numbers via SMS."
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="push"
              control={control}
              render={({ field }) => (
                <NotificationChannel
                  id="toggle-push"
                  icon={<Smartphone className="h-5 w-5" strokeWidth={1.5} />}
                  label="Push Notifications"
                  description="Send real-time push alerts through the mobile and web app."
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Active summary */}
          <div
            className="mt-4 flex items-center gap-2 rounded-lg px-4 py-3"
            style={{ background: '#f9f9fc', border: '1px solid #e9e9ec' }}
          >
            <span className="text-xs" style={{ color: '#4e434e' }}>
              Active channels:
            </span>
            <span className="text-xs font-semibold" style={{ color: '#5c1d67' }}>
              {[
                watch('email') && 'Email',
                watch('sms') && 'SMS',
                watch('push') && 'Push',
              ]
                .filter(Boolean)
                .join(', ') || 'None'}
            </span>
          </div>
        </FormSection>

        {/* ── Section 2: Fee Reminders ── */}
        <FormSection>
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
            >
              Fee Reminder Schedule
            </h3>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Set how many days before the due date a fee reminder is sent to students.
            </p>
          </div>
          <div className="mt-5 max-w-xs">
            <ConfigInput
              label="Fee Reminder Days"
              type="number"
              step="1"
              min="1"
              max="90"
              placeholder="7"
              helpText="Reminder will be sent this many days before the fee due date."
              error={errors.feeReminderDays?.message}
              {...register('feeReminderDays')}
            />
          </div>
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
