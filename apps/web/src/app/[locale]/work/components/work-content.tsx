import { cx } from '@nerdfish/utils'
import {
	CategoryIndicator,
	getCategoryColors,
} from '@repo/design-system/components/category-indicator'
import { Section } from '@repo/design-system/components/section'
import {
	Button,
	H4,
	Paragraph,
	Skeleton,
} from '@repo/design-system/components/ui'
import { ArrowRight } from '@repo/design-system/lib/icons'
import Image from 'next/image'
import Link from 'next/link'
import type * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { Blocks } from '~/app/cms/blocks-renderer'
import { PortableText } from '~/app/cms/components/portable-text'
import { type WorkQueryQuery } from '~/app/cms/types'

const prose = 'prose dark:prose-invert max-w-4xl'

function WorkContent({
	data,
	relatedContent,
}: {
	data: WorkQueryQuery
	relatedContent?: React.ReactNode
}) {
	const { title, category, body, url, excerpt, blocks, heroImg } = data.work

	return (
		<div className="relative">
			<Section
				className="-mt-xl md:-mt-3xl gap-xl mx-auto flex flex-col pt-0 xl:flex-row"
				asChild
			>
				<article>
					<Section
						className={cx('px-0', {
							'xl:max-w-[500px]': blocks?.length,
							'container max-w-4xl': !blocks?.length,
						})}
					>
						<div className="py-lg xl:sticky xl:top-0">
							<header className={cx('mb-lg flex max-w-4xl flex-col', prose)}>
								<H4
									as="h1"
									variant="primary"
									data-tina-field={tinaField(data.work, 'title')}
									className="!m-0 w-auto !text-4xl"
								>
									{title}
								</H4>
								<div className="mt-xs gap-md relative flex">
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
																'ml-sm group-hover:translate-x-xs group-hover:text-primary size-4 text-current transition-all',
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
									className="mb-md text-xl font-bold"
									data-tina-field={tinaField(data.work, 'excerpt')}
								>
									{excerpt}
								</Paragraph>
							) : null}

							{!blocks?.length && heroImg?.src ? (
								<div className="my-xl mx-auto">
									<div
										className="rounded-container relative mx-auto aspect-[4/3] max-w-7xl overflow-hidden"
										data-tina-field={tinaField(data.work, 'heroImg')}
									>
										<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />
										{/* TODO: add aria description */}
										<Image
											aria-hidden
											src={heroImg.src}
											alt={heroImg.alt ?? title}
											className="motion-blur-in-3xl motion-duration-500 rounded-container absolute inset-0 size-full object-cover"
											width={900}
											height={900}
										/>
									</div>
								</div>
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
						<div className="flex-flex-col flex-1">
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
