import { MagnetButton } from '@repo/design-system/components/magnet'
import { type ButtonProps } from '@repo/design-system/components/ui'
import { stripPreSlash } from '@repo/lib/utils/string'
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
			<MagnetButton
				variant={variant}
				asChild
				className="cursor-pointer no-underline"
				size="lg"
			>
				<Link
					{...props}
					href={slug}
					aria-label={text}
					target={isExternal ? '_blank' : undefined}
					rel={isExternal ? 'noopener noreferrer' : undefined}
				>
					{text}
				</Link>
			</MagnetButton>
		</div>
	)
}

export { PortableButton }
