function isNotNullOrUndefined<T>(value: T): value is NonNullable<T> {
	return value !== null && value !== undefined
}

export function nonNullable<T>(array: T[]): NonNullable<T>[] {
	return array.filter(isNotNullOrUndefined)
}
