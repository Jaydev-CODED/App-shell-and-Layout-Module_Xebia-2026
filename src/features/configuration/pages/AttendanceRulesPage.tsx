import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCcw } from 'lucide-react'
import { ConfigInput } from '../../../shared/ui/ConfigInput'
import { ConfigSelect } from '../../../shared/ui/ConfigSelect'
import { FormSection } from '../../../shared/ui/FormSection'
import { PageHeader } from '../../../shared/ui/PageHeader'
import { SaveButton } from '../../../shared/ui/SaveButton'
import { Skeleton } from '../../../shared/ui/Skeleton'
import { useToast } from '../../../shared/ui/ToastProvider'
import {
  attendanceRulesSchema,
  type AttendanceRulesFormValues,
} from '../schemas/attendanceRulesSchema'

const defaultValues: AttendanceRulesFormValues = {
  minimumAttendance: 75,
  medicalLeaveAllowed: 10,
  attendanceWarning: 80,
  attendanceCalculationMethod: 'percentage',
}

export default function AttendanceRulesPage() {
  const { pushToast } = useToast()
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AttendanceRulesFormValues>({
    resolver: zodResolver(attendanceRulesSchema as never),
    defaultValues,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800)
    return () => window.clearTimeout(timer)
  }, [])

  const onSubmit = (values: AttendanceRulesFormValues) => {
    console.info('Attendance rules saved', values)
    pushToast('Attendance rules saved successfully.')
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-16 w-full max-w-md" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Attendance Compliance"
        title="Attendance Rules Configuration"
        description="Set minimum attendance requirements, leave allowances, and warning thresholds."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormSection>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Attendance Policy</h3>
              <p className="text-sm text-slate-500">Set the minimum participation thresholds and warning points for student attendance.</p>
            </div>

            <div className="mt-5 grid gap-4 grid-cols-1 lg:grid-cols-2">
              <ConfigInput
                label="Minimum Attendance"
                type="number"
                step="1"
                min="1"
                max="100"
                placeholder="75"
                helpText="Students must maintain this percentage."
                error={errors.minimumAttendance?.message}
                {...register('minimumAttendance')}
              />

              <ConfigInput
                label="Attendance Warning"
                type="number"
                step="1"
                min="1"
                max="100"
                placeholder="80"
                helpText="Trigger alerts when attendance reaches this level."
                error={errors.attendanceWarning?.message}
                {...register('attendanceWarning')}
              />
            </div>
          </FormSection>

          <FormSection>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Leave Rules</h3>
              <p className="text-sm text-slate-500">Define how much medical leave is permitted under the current policy.</p>
            </div>

            <div className="mt-5 w-full max-w-full lg:max-w-md">
              <ConfigInput
                label="Medical Leave Allowed"
                type="number"
                step="1"
                min="0"
                max="30"
                placeholder="10"
                helpText="Maximum number of allowed medical leave days."
                error={errors.medicalLeaveAllowed?.message}
                {...register('medicalLeaveAllowed')}
              />
            </div>
          </FormSection>

          <FormSection>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
              <p className="text-sm text-slate-500">Choose how attendance will be calculated and communicated to stakeholders.</p>
            </div>

            <div className="mt-5 w-full max-w-full lg:max-w-md">
              <ConfigSelect
                label="Attendance Calculation Method"
                helpText="Select the formula used for attendance computation."
                error={errors.attendanceCalculationMethod?.message}
                {...register('attendanceCalculationMethod')}
              >
                <option value="">Select method</option>
                <option value="percentage">Percentage</option>
                <option value="hours">Hours</option>
              </ConfigSelect>
            </div>
          </FormSection>
        </div>

        <div className="flex flex-wrap gap-3">
          <SaveButton loading={isSubmitting} />

          <button
            type="button"
            onClick={() => {
              reset(defaultValues)
              pushToast('Attendance rules reset to defaults.')
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
