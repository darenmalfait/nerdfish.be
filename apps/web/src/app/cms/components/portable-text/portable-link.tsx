import { stripPreSlash } from '@repo/lib/utils/string'
import { ExternalLinkIcon } from '@repo/ui/icons'
import Link from 'next/link'

function PortableLink({ url, children }: { url?: string; children: string }) {
	const isExternal = url?.startsWith('http')
	const slug = isExternal ? url : `/${stripPreSlash(url ?? '')}`

	if (!slug) return null

	return (
		<Link
			className="inline-flex items-center border-accent border-b-2 font-normal text-inherit no-underline transition-colors hover:text-accent"
			href={slug}
			target={isExternal ? '_blank' : undefined}
		>
			{children}
			{isExternal ? <ExternalLinkIcon className="ml-1 h-4 w-4" /> : null}
		</Link>
	)
}

export { PortableLink }
