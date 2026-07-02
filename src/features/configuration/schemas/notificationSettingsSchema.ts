import { z } from 'zod'

export const notificationSettingsSchema = z.object({
  email: z.boolean(),
  sms: z.boolean(),
  push: z.boolean(),
  feeReminderDays: z.coerce
    .number({ message: 'Fee reminder days is required' })
    .int('Must be a whole number')
    .min(1, 'Must be at least 1 day')
    .max(90, 'Cannot exceed 90 days'),
})

export type NotificationSettingsFormValues = z.infer<typeof notificationSettingsSchema>
