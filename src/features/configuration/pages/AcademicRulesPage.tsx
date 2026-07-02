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

// Dummy JSON as per BRD
const defaultValues: AcademicRulesFormValues = {
  academicYear: '2026-2027',
  currentSemester: 'odd',
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
    // Simulate loading from dummy JSON / API
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
    pushToast('Changes discarded.')
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
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ))}
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

        {/* ── Section 1: Academic Calendar ── */}
        <FormSection>
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
            >
              Academic Calendar
            </h3>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Set the active academic year and current running semester.
            </p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ConfigInput
              label="Academic Year"
              placeholder="2026-2027"
              helpText="Format: YYYY-YYYY (e.g. 2026-2027)"
              error={errors.academicYear?.message}
              {...register('academicYear')}
            />
            <ConfigSelect
              label="Current Semester"
              error={errors.currentSemester?.message}
              {...register('currentSemester')}
            >
              <option value="">Select semester</option>
              <option value="odd">Odd Semester</option>
              <option value="even">Even Semester</option>
            </ConfigSelect>
          </div>
        </FormSection>

        {/* ── Section 2: Academic Evaluation ── */}
        <FormSection>
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
            >
              Academic Evaluation
            </h3>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Set the minimum performance thresholds and academic relief allowances.
            </p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ConfigInput
              label="Passing Percentage (%)"
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

        {/* ── Section 3: Credit & Grading ── */}
        <FormSection>
          <div className="space-y-1 pb-5" style={{ borderBottom: '1px solid #e9e9ec' }}>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
            >
              Credit & Grading System
            </h3>
            <p className="text-sm" style={{ color: '#4e434e' }}>
              Configure credit load limits, semester structure, and CGPA scale.
            </p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <ConfigInput
              label="Maximum Credits per Semester"
              type="number"
              step="1"
              min="1"
              max="40"
              placeholder="24"
              error={errors.maximumCredits?.message}
              {...register('maximumCredits')}
            />
            <ConfigSelect
              label="Semester Structure"
              error={errors.semesterSystem?.message}
              {...register('semesterSystem')}
            >
              <option value="">Select structure</option>
              <option value="semester">Semester-based</option>
              <option value="annual">Annual</option>
            </ConfigSelect>
            <ConfigInput
              label="CGPA Scale"
              type="number"
              step="0.1"
              min="1"
              max="10"
              placeholder="10"
              helpText="e.g. 10 for 10-point scale"
              error={errors.cgpaScale?.message}
              {...register('cgpaScale')}
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

          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:bg-[#f3f3f6]"
            style={{ border: '1px solid #e9e9ec', background: '#fff', color: '#4e434e' }}
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  )
}
