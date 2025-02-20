import { z } from 'zod'

export const calendarEventSchema = z.object({
	id: z.string(),
	start: z.date(),
	end: z.date(),
	title: z.string(),
	subtitle: z.string().optional(),
	description: z.string().optional(),
})

export type CalendarEvent = z.infer<typeof calendarEventSchema>
