import { Button } from '@nerdfish/react/button'
import { Skeleton } from '@nerdfish/react/skeleton'
import {
	CategoryIndicator,
	getCategoryColors,
} from '@repo/design-system/components/category-indicator'
import { Section } from '@repo/design-system/components/section'
import { ArrowRight } from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'
import { type Project } from 'content-collections'
import Image from 'next/image'
import Link from 'next/link'
import type * as React from 'react'
import { Body } from './work-body'

function WorkContent({
	data,
	relatedContent,
}: {
	data: Project
	relatedContent?: React.ReactNode
}) {
	const { title, category, body, url, excerpt, summary, heroImg } = data

	const layout = category === 'webdesign' ? 'default' : 'full'

	return (
		<div className="relative">
			<Section
				className="md:-mt-strangers gap-acquaintances mx-auto flex flex-col pt-0 xl:flex-row"
				asChild
			>
				<article>
					<Section
						compact
						className={cn('px-0', {
							'xl:max-w-125': layout === 'default',
							'container max-w-4xl': layout === 'full',
						})}
					>
						<div className="py-casual xl:top-acquaintances max-w-4xl xl:sticky">
							<CategoryIndicator
								className="mb-friends"
								category={category}
								inline
							/>

							<header
								className={cn('mb-casual mx-auto flex max-w-4xl flex-col')}
							>
								<h4 className="typography-title m-0! w-auto text-4xl!">
									{title}
								</h4>
								<div className="mt-friends gap-friends mb-friends relative flex items-center">
									{url ? (
										<div>
											<Button
												variant="secondary"
												render={
													<Link
														className="group no-underline"
														href={url}
														target="_blank"
													>
														Visit website
														<span className={getCategoryColors(category)}>
															<ArrowRight
																className={cn(
																	'ml-best-friends group-hover:translate-x-bff group-hover:text-foreground size-4 text-current transition-all',
																)}
															/>
														</span>
													</Link>
												}
											/>
										</div>
									) : null}
								</div>
							</header>

							{excerpt ? (
								<p className="typography-body text-foreground mb-friends! m-0! text-xl font-bold">
									{excerpt}
								</p>
							) : null}

							{layout === 'full' && heroImg.src ? (
								<div className="my-xl mx-auto">
									<div className="rounded-container relative mx-auto aspect-4/3 max-w-7xl overflow-hidden">
										<Skeleton className="rounded-container absolute inset-0 size-full object-cover" />
										{/* TODO: add aria description */}
										<Image
											aria-hidden
											src={heroImg.src}
											alt={heroImg.alt}
											className="motion-blur-in-3xl motion-duration-500 rounded-container absolute inset-0 size-full object-cover"
											width={900}
											height={900}
										/>
									</div>
								</div>
							) : null}

							{summary ? (
								<div className="typography mx-auto max-w-4xl">
									<Body content={summary} />
								</div>
							) : null}
						</div>
					</Section>

					{layout === 'default' && body.length ? (
						<div className="flex flex-1 flex-col">
							<div className="-mx-friends">
								<Body content={body} />
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
