import { Section } from '@repo/design-system/components/section'
import { Button, H1, Paragraph } from '@repo/design-system/components/ui'
import { ChevronLeftIcon } from '@repo/design-system/icons'
import Image from 'next/image'
import Link from 'next/link'

const title = "404 - Page doesn't exist"
const subtitle = "Sorry, we couldn't find the page you were looking for."

export default function Custom404() {
	return (
		<Section className="gap-md max-w-5xl text-center">
			<Image
				src="/images/404.png"
				alt={title}
				width={500}
				height={500}
				className="rounded-container mb-xl mx-auto"
			/>
			<div className="mb-lg text-center">
				<H1 variant="primary">{title}</H1>
				<Paragraph className="text-foreground-muted text-xl">
					{subtitle}
				</Paragraph>
			</div>
			<Button size="lg" asChild>
				<Link href="/" className="mx-auto flex w-auto">
					<ChevronLeftIcon className="mr-2 size-4" />
					Go back home
				</Link>
			</Button>
		</Section>
	)
}
