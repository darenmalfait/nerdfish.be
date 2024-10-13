import { stripPreSlash } from '@nerdfish-website/lib/utils'
import { ExternalLinkIcon } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import * as React from 'react'

function PortableLink({ url, children }: { url?: string; children: string }) {
	const isExternal = url?.startsWith('http')
	const slug = isExternal ? url : `/${stripPreSlash(url ?? '')}`

	if (!slug) return null

	return (
		<Link
			className="border-accent hover:text-accent inline-flex items-center border-b-2 font-normal text-inherit no-underline transition-colors"
			href={slug}
			target={isExternal ? '_blank' : undefined}
		>
			{children}
			{isExternal ? <ExternalLinkIcon className="ml-1 h-4 w-4" /> : null}
		</Link>
	)
}

export { PortableLink }
