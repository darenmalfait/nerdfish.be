'use client'

import { MagnetButton } from '@repo/design-system/components/magnet'
import { Section } from '@repo/design-system/components/section'
import { H2 } from '@repo/design-system/components/ui'
import { ArrowRightIcon } from '@repo/design-system/lib/icons'
import Link from 'next/link'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { getPagePath } from '~/app/[locale]/(pages)/utils'
import { type Block, type PageBlocksCta } from '~/app/cms/types'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <Section>{children}</Section>
}

export function CtaBlock(props: Block<PageBlocksCta>) {
	const { title, subtitle, page } = props

	return (
		<BlockLayout>
			<div className="gap-lg flex flex-col justify-between md:flex-row md:items-center">
				<div className="space-y-md flex flex-col lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
					<div className="space-y-sm">
						<H2 data-tina-field={tinaField(props, 'title')}>{title}</H2>
						<H2
							variant="secondary"
							as="div"
							data-tina-field={tinaField(props, 'subtitle')}
						>
							{subtitle}
						</H2>
					</div>
				</div>

				{page?._sys.breadcrumbs ? (
					<div>
						<MagnetButton size="xl" asChild>
							<Link
								data-tina-field={tinaField(props, 'page')}
								href={getPagePath(page)}
							>
								{page.title}
								<ArrowRightIcon className="ml-sm group-hover:translate-x-xs size-6 transition duration-300 xl:size-8" />
							</Link>
						</MagnetButton>
					</div>
				) : null}
			</div>
		</BlockLayout>
	)
}
