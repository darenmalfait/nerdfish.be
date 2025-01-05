import { cx } from '@nerdfish/utils'
import { MagnetButton } from '@repo/design-system/components/magnet'
import { stripPreSlash } from '@repo/design-system/lib/utils/string'
import Link from 'next/link'
import * as React from 'react'

export interface PortableButtonProps
	extends React.ComponentProps<typeof MagnetButton> {
	text: string
	href?: string
}

function PortableButton({
	text,
	href,
	variant = 'default',
	className,
	...props
}: PortableButtonProps) {
	const isExternal = href?.startsWith('http')
	const slug = isExternal ? href : `/${stripPreSlash(href ?? '')}`

	if (!slug) return null

	return (
		<div className="inline-block w-auto">
			<MagnetButton
				size="lg"
				{...props}
				variant={variant}
				asChild
				className={cx('cursor-pointer no-underline', className)}
			>
				<Link
					href={slug}
					aria-label={text}
					target={isExternal ? '_blank' : undefined}
				>
					{text}
				</Link>
			</MagnetButton>
		</div>
	)
}

export { PortableButton }
