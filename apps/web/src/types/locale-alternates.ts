export type LocalizedDatedItem = {
	locale?: string
	date: string
}

export type PathFn<T> = (item: T) => string

export type AbsoluteFn = (pathname: string) => string
