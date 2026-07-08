import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCcw } from 'lucide-react'
import { ConfigInput } from '../../../components/ui/ConfigInput'
import { ConfigSelect } from '../../../components/ui/ConfigSelect'
import { FormSection } from '../../../components/ui/FormSection'
import { PageHeader } from '../../../components/ui/PageHeader'
import { SaveButton } from '../../../components/ui/SaveButton'
import { Skeleton } from '../../../components/ui/Skeleton'
import { useToast } from '../../../components/ui/ToastProvider'
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

  const onSubmit = () => {
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
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl p-6 space-y-4" style={{ border: '1px solid #e9e9ec', background: '#fff' }}>
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-80" />
            <Skeleton className="h-16 w-full max-w-md" />
          </div>
        ))}
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
        <FormSection>
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
            >
              Attendance Policy
            </h3>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Set the minimum participation thresholds and warning points for student attendance.
            </p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <ConfigInput
              label="Minimum Attendance (%)"
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
              label="Attendance Warning (%)"
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
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
            >
              Leave Rules
            </h3>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Define how much medical leave is permitted under the current policy.
            </p>
          </div>
          <div className="mt-5 max-w-sm">
            <ConfigInput
              label="Medical Leave Allowed (days)"
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
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
            >
              Calculation Method
            </h3>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Choose how attendance will be calculated and communicated to stakeholders.
            </p>
          </div>
          <div className="mt-5 max-w-sm">
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

        {/* Action Bar */}
        <div
          className="flex flex-wrap items-center gap-3 rounded-xl px-5 py-4"
          style={{ border: '1px solid #e9e9ec', background: '#f9f9fc' }}
        >
          <SaveButton loading={isSubmitting} />

          <button
            type="button"
            onClick={() => {
              reset(defaultValues)
              pushToast('Attendance rules reset to defaults.')
            }}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:bg-[#f3f3f6]"
            style={{ border: '1px solid #e9e9ec', background: '#fff', color: '#1a1c1e' }}
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
