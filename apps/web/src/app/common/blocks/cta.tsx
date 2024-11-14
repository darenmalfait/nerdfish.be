'use client'

import { Link } from '@nerdfish/ui'
import { Section } from '@nerdfish-website/ui/components'
import { ArrowRightIcon } from '@nerdfish-website/ui/icons'
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
					<Link
						data-tina-field={tinaField(props, 'page')}
						href={getPagePath(page)}
						className="bg-inverted text-inverted hover:!bg-inverted/90 rounded-semi group font-medium"
					>
						<span className="px-mdx py-md flex items-center text-3xl">
							{page.title}
							<ArrowRightIcon className="ml-md size-8 transition duration-300 group-hover:translate-x-1" />
						</span>
					</Link>
				) : null}
			</div>
		</BlockLayout>
	)
}
