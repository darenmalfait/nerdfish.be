export type PartialDeep<T> = T extends object
	? {
			[P in keyof T]?: PartialDeep<T[P]>
		}
	: T

export interface ActionResponse<T> {
	success: boolean
	data?: T
	error?: string
}
