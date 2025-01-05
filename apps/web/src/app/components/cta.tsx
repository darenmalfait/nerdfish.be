'use client'

import { MagnetButton } from '@repo/design-system/components/magnet'
import { H2 } from '@repo/design-system/components/ui'
import { ArrowRightIcon } from '@repo/design-system/lib/icons'
import type * as React from 'react'
import { Link } from './link'
import { type PageBlocksCta } from '~/app/cms/types'

export interface CtaProps extends PageBlocksCta {
	link?: {
		href: string
		label: string
	}
}

export function Cta(props: CtaProps) {
	const { title, subtitle, link } = props

	return (
		<div className="gap-lg flex flex-col justify-between md:flex-row md:items-center">
			<div className="space-y-md flex flex-col lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
				<div className="space-y-sm">
					<H2>{title}</H2>
					<H2 variant="secondary" as="div">
						{subtitle}
					</H2>
				</div>
			</div>

			{link?.href ? (
				<div>
					<MagnetButton size="xl" asChild>
						<Link href={link.href}>
							{link.label}
							<ArrowRightIcon className="ml-sm group-hover:translate-x-xs size-6 transition duration-300 xl:size-8" />
						</Link>
					</MagnetButton>
				</div>
			) : null}
		</div>
	)
}
