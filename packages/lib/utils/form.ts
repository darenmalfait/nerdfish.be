import { z } from 'zod'

export const actionResponseSchema = z.object({
	success: z.boolean(),
	data: z.any().optional(),
	error: z.string().optional(),
})

export type ActionResponse<T> = z.infer<typeof actionResponseSchema> & {
	data?: T
}
