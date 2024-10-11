import { Icons } from '@nerdfish-website/ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import { tinaField } from 'tinacms/dist/react'
import { BigTitle } from '../components/big-title'
import {
	PortableText,
	type Block,
	type PageBlocksHero,
	type PageBlocksHeroAction,
} from '~/app/cms'

function Title(props: {
	title?: string | null
	action?: PageBlocksHeroAction
}) {
	const { title, action } = props

	if (!title && !action?.label) return null

	return (
		<div className="flex flex-col space-y-3">
			{action?.label ? (
				<div>
					<Link
						href={action.href ?? '/'}
						data-tina-field={tinaField(action)}
						className="from-accent/50 via-blog-wiki/50 to-blog-project/50 group relative inline-block w-auto cursor-pointer rounded-full bg-gradient-to-r p-[1px] outline-none brightness-90 contrast-150 dark:brightness-125 dark:contrast-100"
					>
						<div className="group-focus:outline-active rounded-full bg-white/80 px-3 py-1 group-focus:after:rounded-full dark:bg-black/80">
							<span className="from-accent via-blog-wiki to-blog-project flex select-none items-center bg-gradient-to-r bg-clip-text text-transparent">
								<span className="font-normal">{action.label}</span>
								<Icons.ChevronRight
									direction="right"
									className="stroke-primary ml-2 size-4 stroke-2 transition-transform group-hover:translate-x-0.5"
								/>
							</span>
						</div>
					</Link>
				</div>
			) : null}
			<BigTitle
				className="relative font-black text-white"
				data-tina-field={tinaField(props, 'title')}
			>
				{title}
			</BigTitle>
		</div>
	)
}

export function HeroBlock(data: Block<PageBlocksHero>) {
	const { image, text, title, action } = data

	return (
		<section className="relative">
			<div className="rounded-semi from-accent/50 via-blog-wiki/50 to-blog-project/50 absolute inset-2 bottom-0 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[28%] via-[70%] ring-1 ring-inset ring-black/5 sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]" />
			<div className="container relative mx-auto px-4">
				<div className="pb-24 pt-32 sm:pb-32 md:pb-48">
					<Title title={title} action={action ?? {}} />
					<div className="dark mt-8 max-w-lg">
						<div className="prose dark:prose-invert prose-xl mb-12 mt-8 !text-white">
							<PortableText content={text} />
						</div>
					</div>
					{image?.src ? (
						<div className="absolute bottom-0 right-0 w-full max-w-[50%] flex-none">
							<Image
								className="inset-0 mb-12 rounded-xl"
								src={image.src}
								width={700}
								height={700}
								loading="eager"
								alt={image.alt ?? ''}
							/>
						</div>
					) : null}
				</div>
			</div>
		</section>
	)
}
