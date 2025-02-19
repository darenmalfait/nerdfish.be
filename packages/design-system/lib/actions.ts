export interface ActionResponse<T> {
	success: boolean
	data?: T
	error?: string
}
