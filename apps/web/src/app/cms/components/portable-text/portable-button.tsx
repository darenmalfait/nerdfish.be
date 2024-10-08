import { Button, type ButtonProps } from '@nerdfish/ui'
import { stripPreSlash } from '@nerdfish-website/lib/utils'
import Link from 'next/link'

function PortableButton({
	text,
	href,
	variant = 'default',
	...props
}: { text: string; href?: string } & Pick<ButtonProps, 'variant'>) {
	const isExternal = href?.startsWith('http')
	const slug = isExternal ? href : `/${stripPreSlash(href ?? '')}`

	if (!slug) return null

	return (
		<div className="inline-block w-auto">
			<Button
				variant={variant}
				asChild
				className="cursor-pointer no-underline"
				size="xl"
			>
				<Link {...props} href={slug} target={isExternal ? '_blank' : undefined}>
					{text}
				</Link>
			</Button>
		</div>
	)
}

export { PortableButton }
