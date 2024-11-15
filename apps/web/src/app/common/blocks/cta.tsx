'use client'

import { Button } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { ArrowRightIcon } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import {
	SectionHeader,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from '../components'
import { getPagePath } from '~/app/[locale]/(pages)/utils'
import { type PageBlocksCta, type Block } from '~/app/cms'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null

	return <Section>{children}</Section>
}

export function CtaBlock(props: Block<PageBlocksCta>) {
	const { title, subtitle, page } = props

	return (
		<BlockLayout>
			<div className="gap-lg flex flex-col justify-between md:flex-row md:items-center">
				<SectionHeader className="!mb-0">
					<SectionHeaderTitle data-tina-field={tinaField(props, 'title')}>
						{title}
					</SectionHeaderTitle>
					<SectionHeaderSubtitle data-tina-field={tinaField(props, 'subtitle')}>
						{subtitle}
					</SectionHeaderSubtitle>
				</SectionHeader>
				{page?._sys.breadcrumbs ? (
					<div>
						<Button className="group inline-flex" size="xl" asChild>
							<Link
								data-tina-field={tinaField(props, 'page')}
								href={getPagePath(page)}
							>
								{page.title}
								<ArrowRightIcon className="ml-sm group-hover:translate-x-xs size-6 transition duration-300 xl:size-8" />
							</Link>
						</Button>
					</div>
				) : null}
			</div>
		</BlockLayout>
	)
}
