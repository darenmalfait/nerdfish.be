import * as z from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Your name seems a bit short.')
    .max(32, 'Your name seems a bit long.'),
  email: z.string().email('Please enter a valid email address.'),
  project: z
    .string()
    .min(3, 'Does not seem to be a valid project')
    .max(32, 'Does not seem to be a valid project'),
  textMessage: z
    .string()
    .min(10, 'I hope that your message is a bit longer than that.')
    .max(
      512,
      'I like that you have a lot to say, but please keep it under 512 characters.',
    ),
  recaptchaResponse: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
