import { Button } from '@nerdfish/react/button'
import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Section } from '@repo/design-system/components/section'

const TITLE = "404 - Page doesn't exist"
const SUBTITLE = "Sorry, we couldn't find the page you were looking for."

export default function NotFound() {
	return (
		<Section className="gap-friends max-w-5xl text-center">
			<Image
				src="/images/404-transparent.png"
				alt={TITLE}
				width={500}
				height={500}
				className="rounded-container mb-acquaintances mx-auto"
			/>
			<div className="mb-casual text-center">
				<h1 className="typography-heading">{TITLE}</h1>
				<p className="typography-body text-foreground-muted text-xl">
					{SUBTITLE}
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
