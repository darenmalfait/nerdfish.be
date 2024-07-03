import { type Metadata } from 'next'
import { type OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types'

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
	T extends (...args: any) => Promise<infer R> ? R : any

export type NonNullProperties<Type> = {
	[Key in keyof Type]-?: Exclude<Type[Key], null | undefined>
}

export type SocialMetas = {
	canonical?: string | null
	description: string
	ogImage: string
	schema?: string
	title: string
	type?: OpenGraphType
	url: string
	other?: Metadata
}
