import { z } from 'zod'

export const attendanceRulesSchema = z.object({
  minimumAttendance: z.coerce.number({ message: 'Minimum attendance is required' }).min(1, 'Minimum attendance is required').max(100, 'Value cannot exceed 100'),
  medicalLeaveAllowed: z.coerce.number({ message: 'Medical leave is required' }).min(0, 'Medical leave cannot be negative').max(30, 'Value cannot exceed 30'),
  attendanceWarning: z.coerce.number({ message: 'Attendance warning is required' }).min(1, 'Attendance warning is required').max(100, 'Value cannot exceed 100'),
  attendanceCalculationMethod: z.enum(['percentage', 'hours'], { message: 'Attendance calculation method is required' }),
})

export type AttendanceRulesFormValues = z.infer<typeof attendanceRulesSchema>
