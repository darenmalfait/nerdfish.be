import { z } from 'zod'

export const withRecaptcha = <T extends z.ZodObject<any>>(schema: T) => {
	return schema.extend({
		recaptchaResponse: z.string().optional(),
	}) as z.ZodObject<
		T['shape'] & { recaptchaResponse: z.ZodOptional<z.ZodString> }
	>
}
