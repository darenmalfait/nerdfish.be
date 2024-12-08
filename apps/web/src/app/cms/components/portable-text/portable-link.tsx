import { stripPreSlash } from '@repo/lib/utils/string'
import { ExternalLinkIcon } from '@repo/ui/icons'
import Link from 'next/link'

const hrefParameters = ['mailto', 'tel', 'sms', 'http', 'https', 'whatsapp']

function PortableLink({ url, children }: { url?: string; children: string }) {
	const isExternal = hrefParameters.some((hrefParameter) =>
		url?.startsWith(hrefParameter),
	)
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
