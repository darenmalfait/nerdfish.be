import { Button, H4, Paragraph } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	CategoryIndicator,
	getCategoryColors,
} from '@repo/ui/components/category-indicator'
import { Section } from '@repo/ui/components/section'
import { ArrowRight } from '@repo/ui/icons'
import Link from 'next/link'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { Blocks } from '~/app/cms/blocks-renderer'
import { PortableText } from '~/app/cms/components/portable-text'
import type { WorkQueryQuery } from '~/app/cms/types'

const prose = 'prose dark:prose-invert max-w-4xl'

function WorkContent({
	data,
	relatedContent,
}: {
	data: WorkQueryQuery
	relatedContent?: React.ReactNode
}) {
	const { title, category, body, url, excerpt, blocks } = data.work

	return (
		<div className="relative">
			<Section asChild>
				<article className="-mt-xl md:-mt-3xl mx-auto flex flex-col gap-xl px-md pt-0 xl:flex-row">
					<Section
						className={cx('!px-0', {
							'xl:max-w-[500px]': blocks?.length,
							'container max-w-4xl px-0': !blocks?.length,
						})}
					>
						<div className="py-lg xl:sticky xl:top-0">
							<header className={cx('mb-lg flex max-w-4xl flex-col', prose)}>
								<H4
									as="h1"
									variant="primary"
									data-tina-field={tinaField(data.work, 'title')}
									className="!m-0 !text-4xl w-auto"
								>
									{title}
								</H4>
								<div className="relative mt-xs flex gap-md">
									{url ? (
										<div className="mb-md">
											<Button variant="secondary" asChild>
												<Link
													className="group no-underline"
													href={url}
													target="_blank"
												>
													Visit website
													<span className={getCategoryColors(category)}>
														<ArrowRight
															className={cx(
																'ml-sm size-4 text-current transition-all group-hover:translate-x-xs group-hover:text-primary'
															)}
														/>
													</span>
												</Link>
											</Button>
										</div>
									) : null}
									<CategoryIndicator category={category} inline />
								</div>
							</header>

							{excerpt ? (
								<Paragraph
									className="mb-md font-bold text-xl"
									data-tina-field={tinaField(data.work, 'excerpt')}
								>
									{excerpt}
								</Paragraph>
							) : null}

							{body ? (
								<div className={prose}>
									<PortableText
										data-tina-field={tinaField(data.work, 'body')}
										content={body}
									/>
								</div>
							) : null}
						</div>
					</Section>

					{blocks?.length ? (
						<div className="flex-1 flex-flex-col">
							<div className="-mx-md">
								<Blocks items={blocks} />
							</div>
						</div>
					) : null}
				</article>
			</Section>

			{relatedContent}
		</div>
	)
}

export { WorkContent }
