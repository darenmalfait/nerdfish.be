import * as z from 'zod'

export const ogImageSchema = z.object({
  image: z.string().optional().nullable(),
  heading: z.string(),
})
