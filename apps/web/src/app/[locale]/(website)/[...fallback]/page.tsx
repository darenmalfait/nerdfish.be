import { Button } from '@nerdfish/react/button'
import { Section } from '@repo/design-system/components/section'
import { ChevronLeftIcon } from '@repo/design-system/icons'
import Image from 'next/image'
import Link from 'next/link'

const title = "404 - Page doesn't exist"
const subtitle = "Sorry, we couldn't find the page you were looking for."

export default function Custom404() {
	return (
		<Section className="gap-friends max-w-5xl text-center">
			<Image
				src="/images/404-transparent.png"
				alt={title}
				width={500}
				height={500}
				className="rounded-container mb-acquaintances mx-auto"
			/>
			<div className="mb-casual text-center">
				<h1 className="typography-heading">{title}</h1>
				<p className="typography-body text-foreground-muted text-xl">
					{subtitle}
				</p>
			</div>
			<Button
				size="lg"
				render={
					<Link href="/" className="mx-auto flex w-auto">
						<ChevronLeftIcon className="mr-2 size-4" />
						Go back home
					</Link>
				}
			/>
		</Section>
	)
}
