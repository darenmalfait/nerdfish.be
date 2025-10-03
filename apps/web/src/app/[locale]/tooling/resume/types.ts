import z from 'zod'

const experienceSchema = z.object({
	when: z.string(),
	where: z.string(),
	what: z.string(),
	role: z.string().optional(),
})

const skillSchema = z.object({
	type: z.string(),
	skills: z.string(),
})

const projectSchema = z.object({
	title: z.string(),
	description: z.string(),
	technologies: z.string(),
})

export const resumeSchema = z.object({
	role: z.string().optional(),
	name: z.string().optional(),
	email: z.string().email().optional(),
	website: z.string().optional(),
	address: z.string().optional(),
	about: z
		.object({
			title: z.string(),
			description: z.string(),
		})
		.optional(),
	experience: z
		.object({
			title: z.string(),
			items: z.array(experienceSchema),
		})
		.optional(),
	skills: z
		.object({
			title: z.string(),
			items: z.array(skillSchema),
		})
		.optional(),
	education: z
		.object({
			title: z.string(),
			items: z.array(experienceSchema),
		})
		.optional(),
	projects: z
		.object({
			title: z.string(),
			items: z.array(projectSchema),
		})
		.optional(),
})

export type Resume = z.infer<typeof resumeSchema>
