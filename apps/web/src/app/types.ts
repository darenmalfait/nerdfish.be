import { type NextMiddleware } from 'next/server'

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

export interface ImageType {
	src: string
	alt: string
}
