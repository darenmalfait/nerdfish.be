import { Button, H1, Paragraph } from '@nerdfish/ui'
import { ChevronLeftIcon } from '@nerdfish-website/ui/icons'
import Image from 'next/image'
import Link from 'next/link'

import errorImage from '~/assets/images/nerdfish.png'

function ErrorPage({
	title = '404',
	subtitle,
}: {
	title?: string
	subtitle?: string
}) {
	return (
		<section className="container mx-auto flex flex-col gap-8 px-4 py-12 text-center lg:py-32">
			<Image
				placeholder="blur"
				src={errorImage}
				alt={title}
				width={500}
				height={500}
				className="mx-auto"
			/>
			<div>
				<H1>{title}</H1>
				<Paragraph>{subtitle}</Paragraph>
			</div>
			<Button asChild>
				<Link href="/" className="mx-auto flex w-auto">
					<ChevronLeftIcon className="mr-2 size-4" />
					Go back home
				</Link>
			</Button>
		</section>
	)
}

export { ErrorPage }
