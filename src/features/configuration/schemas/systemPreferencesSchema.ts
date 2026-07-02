import { z } from 'zod'

export const systemPreferencesSchema = z.object({
  timeZone: z.string().min(1, 'Time zone is required'),
  dateFormat: z.enum(['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD'], {
    message: 'Date format is required',
  }),
  language: z.string().min(1, 'Language is required'),
})

export type SystemPreferencesFormValues = z.infer<typeof systemPreferencesSchema>
