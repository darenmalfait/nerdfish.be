import {z} from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(3).max(32),
  email: z.string().email(),
  project: z.string().min(3).max(32),
  textMessage: z.string().min(3).max(512),
  recaptchaResponse: z.string().optional(),
})
