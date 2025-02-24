import { z } from 'zod'

export const calendarEventSchema = z.object({
	id: z.string(),
	start: z.date(),
	end: z.date(),
	project: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.optional(),
	subtitle: z.string().optional(),
	description: z.string().optional(),
})

export type CalendarEvent = z.infer<typeof calendarEventSchema>
