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
  academicRulesSchema,
  type AcademicRulesFormValues,
} from '../schemas/academicRulesSchema'

const defaultValues: AcademicRulesFormValues = {
  passingPercentage: 40,
  maximumCredits: 24,
  cgpaScale: 10,
  graceMarks: 5,
  semesterSystem: 'semester',
}

export default function AcademicRulesPage() {
  const { pushToast } = useToast()
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AcademicRulesFormValues>({
    resolver: zodResolver(academicRulesSchema as never),
    defaultValues,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800)
    return () => window.clearTimeout(timer)
  }, [])

  const onSubmit = (values: AcademicRulesFormValues) => {
    console.info('Academic rules saved', values)
    pushToast('Academic rules saved successfully.')
  }

  const handleReset = () => {
    reset(defaultValues)
    pushToast('Academic rules reset to defaults.')
  }

  const handleCancel = () => {
    reset(defaultValues)
    pushToast('Changes cancelled.')
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
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Academic Governance"
        title="Academic Rules Configuration"
        description="Define the core academic thresholds and evaluation standards for the institution."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormSection>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Academic Evaluation</h3>
              <p className="text-sm text-slate-500">Set the minimum performance thresholds and academic relief allowances.</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ConfigInput
                label="Passing Percentage"
                type="number"
                step="1"
                min="1"
                max="100"
                placeholder="40"
                error={errors.passingPercentage?.message}
                {...register('passingPercentage')}
              />

              <ConfigInput
                label="Grace Marks"
                type="number"
                step="1"
                min="0"
                max="20"
                placeholder="5"
                error={errors.graceMarks?.message}
                {...register('graceMarks')}
              />
            </div>
          </FormSection>

          <FormSection>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Credit Policies</h3>
              <p className="text-sm text-slate-500">Configure the load limits and academic calendar structure.</p>
            </div>

            <div className="mt-5 grid gap-4 grid-cols-1 lg:grid-cols-2">
              <ConfigInput
                label="Maximum Credits"
                type="number"
                step="1"
                min="1"
                max="40"
                placeholder="24"
                error={errors.maximumCredits?.message}
                {...register('maximumCredits')}
              />

              <ConfigSelect
                label="Semester System"
                error={errors.semesterSystem?.message}
                {...register('semesterSystem')}
              >
                <option value="">Select system</option>
                <option value="semester">Semester</option>
                <option value="annual">Annual</option>
              </ConfigSelect>
            </div>
          </FormSection>

          <FormSection>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Grading System</h3>
              <p className="text-sm text-slate-500">Define the grading scale used for academic evaluation.</p>
            </div>

            <div className="mt-5 w-full max-w-full lg:max-w-md">
              <ConfigInput
                label="CGPA Scale"
                type="number"
                step="0.1"
                min="1"
                max="10"
                placeholder="10"
                error={errors.cgpaScale?.message}
                {...register('cgpaScale')}
              />
            </div>
          </FormSection>
        </div>

        <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <SaveButton loading={isSubmitting} />

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
