import { ExternalLinkIcon } from '@repo/design-system/icons'
import { stripPreSlash } from '@repo/lib/utils/string'
import Link from 'next/link'

const hrefParameters = ['mailto', 'tel', 'sms', 'http', 'https', 'whatsapp']

function PortableLink({ href, children }: { href?: string; children: string }) {
	const isExternal = hrefParameters.some((hrefParameter) =>
		href?.startsWith(hrefParameter),
	)
	const slug = isExternal ? href : `/${stripPreSlash(href ?? '')}`

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
