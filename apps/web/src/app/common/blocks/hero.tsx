import { Skeleton } from '@nerdfish/ui'
import Image from 'next/image'
import * as React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { BigTitle, bigTitleClassNames } from '../components/big-title'
import { PortableText, type Block, type PageBlocksHero } from '~/app/cms'

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className="relative">
			<div className="rounded-semi from-accent/50 via-blog-wiki/50 to-blog-project/50 absolute inset-2 bottom-0 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[28%] via-[70%] ring-1 ring-inset ring-black/5 sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]" />
			<div className="container relative mx-auto px-8 lg:px-4">
				<div className="pb-24 pt-32 duration-700 sm:pb-32 md:pb-48">
					{children}
				</div>
			</div>
		</section>
	)
}

function ContentLayout({ children }: { children?: React.ReactNode }) {
	if (!children) return null

	return (
		<div className="dark mt-8 max-w-lg">
			<div className="prose dark:prose-invert lg:prose-xl animate-in fade-in mb-12 mt-8 !text-white duration-1000">
				{children}
			</div>
		</div>
	)
}

function Title(props: { title?: string | null }) {
	const { title } = props

	if (!title) return null

	return (
		<div
			className="animate-in fade-in flex flex-col space-y-3 duration-700"
			data-tina-field={tinaField(props, 'title')}
		>
			<BigTitle className="relative font-black text-white" value={title} />
		</div>
	)
}

function HeroImage({ image }: { image?: Block<PageBlocksHero>['image'] }) {
	if (!image?.src) return null

	return (
		<div className="animate-in fade-in zoom-in-150 absolute bottom-0 right-0 w-full max-w-[50%] flex-none duration-700">
			<Image
				// sticker effect
				className="inset-0 mb-12 rounded-xl [filter:drop-shadow(0px_0px_3px_#000)]"
				src={image.src}
				width={700}
				height={700}
				loading="eager"
				alt={image.alt ?? ''}
			/>
		</div>
	)
}

export function HeroBlock(data: Block<PageBlocksHero>) {
	const { image, text, title } = data

	return (
		<React.Suspense
			fallback={
				<Layout>
					<span className={bigTitleClassNames}>
						<Skeleton className="w-full max-w-3xl" />
					</span>
					<ContentLayout>
						<Skeleton count={3} />
					</ContentLayout>
				</Layout>
			}
		>
			<Layout>
				<Title title={title} />
				<ContentLayout>
					<PortableText
						data-tina-field={tinaField(text, 'text')}
						content={text}
					/>
				</ContentLayout>
				<HeroImage image={image} />
			</Layout>
		</React.Suspense>
	)
}
