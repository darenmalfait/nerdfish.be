'use client'

import { stripPreSlash } from '@repo/lib/utils/string'
import NextLink from 'next/link'
import { type ComponentProps, useImperativeHandle, useRef } from 'react'
import { routing, Link as RouteLink } from 'routing'

const hrefParameters = ['mailto', 'tel', 'sms', 'http', 'https', 'whatsapp']

export type LinkProps = Omit<ComponentProps<'a'>, 'popover'>

export function Link({ href, children, ref, ...props }: LinkProps) {
	const itemRef = useRef<HTMLAnchorElement>(null)
	useImperativeHandle(ref, () => itemRef.current as HTMLAnchorElement)

	const isExternal = hrefParameters.some((hrefParameter) =>
		href?.startsWith(hrefParameter),
	)
	const slug = isExternal ? href : `/${stripPreSlash(href ?? '')}`

	if (!slug) return null

	const LinkElement = slug in routing.pathnames ? RouteLink : NextLink

	return (
		<LinkElement
			{...props}
			ref={itemRef}
			// we check if the slug is in the routing.pathnames object, if it is, we use the RouteLink component, otherwise we use the NextLink component
			href={slug as any}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noopener noreferrer' : undefined}
		>
			{children}
		</LinkElement>
	)
}
