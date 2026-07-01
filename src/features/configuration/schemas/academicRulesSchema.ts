import { z } from 'zod'

const numberField = (message: string, max: number) =>
  z.coerce.number({ message }).min(1, message).max(max, `Value cannot exceed ${max}`)

export const academicRulesSchema = z.object({
  passingPercentage: numberField('Passing percentage is required', 100),
  maximumCredits: numberField('Maximum credits is required', 40),
  cgpaScale: numberField('CGPA scale is required', 10),
  graceMarks: z.coerce.number({ message: 'Grace marks is required' }).min(0, 'Grace marks cannot be negative').max(20, 'Value cannot exceed 20'),
  semesterSystem: z.enum(['semester', 'annual'], { message: 'Semester system is required' }),
})

export type AcademicRulesFormValues = z.infer<typeof academicRulesSchema>
