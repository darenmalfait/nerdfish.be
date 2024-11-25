'use client'

import { LoadingAnimation, H1, Separator, H3 } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import {
	Section,
	InViewBackground,
	TextSlideUp,
} from '@nerdfish-website/ui/components'
import { ArrowRight } from '@nerdfish-website/ui/icons'
import Link from 'next/link'
import * as React from 'react'
import { SocialLinks } from './navigation'
import { SiteHeader } from './site-header'
import { useGlobal } from '~/app/global-provider'

function Disclaimer() {
	const { companyInfo } = useGlobal()

	const currentYear = new Date().getFullYear()

	return (
		<div className="space-y-md my-lg">
			<p className="text-muted max-w-2xl text-lg lg:text-xl">
				Made by{' '}
				<Link
					className="text-primary cursor-pointer font-medium transition duration-300 hover:opacity-70"
					href="https://www.nerdfish.be"
				>
					nerdfish
				</Link>
				, development with user experience in mind. The code is{' '}
				<Link
					className="text-primary cursor-pointer font-medium transition duration-300 hover:opacity-70"
					href="https://github.com/darenmalfait/nerdfish.be"
					target="_blank"
				>
					open-source
				</Link>
				.
			</p>
			<div className="-mx-md">
				<SocialLinks />
			</div>
			<div className="text-muted flex justify-start text-xs font-normal">
				© {companyInfo?.companyName} {currentYear}.
			</div>
		</div>
	)
}

function SiteFooterHeading() {
	const { paths } = useGlobal()

	return (
		<H1 as="h2" className="py-lg text-primary mb-xl">
			<Link
				href={paths?.contact ?? '/'}
				className="group"
				aria-label="Let’s work together"
			>
				<TextSlideUp>
					<span>
						Let’s work{' '}
						<ArrowRight className="ml-xs group-hover:text-accent group-hover:translate-x-xs inline size-8 transform duration-300 md:size-12 lg:size-16" />
					</span>
					<span>together</span>
				</TextSlideUp>
			</Link>
		</H1>
	)
}

function SiteFooterContent() {
	const { companyInfo } = useGlobal()

	return (
		<div className="space-y-xs mb-lg">
			<H3 className="!text-base font-semibold leading-normal">Speak with us</H3>
			<span className="block !text-base font-normal leading-normal">
				{companyInfo?.companyName}
			</span>
			<Link
				className="block !text-base font-normal leading-normal"
				href={`mailto:${companyInfo?.email}`}
			>
				{companyInfo?.email}
			</Link>
			<span className="block !text-base font-normal leading-normal">
				{companyInfo?.vat}
			</span>
		</div>
	)
}

const SiteFooter = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
	return (
		<div ref={ref} className={cx('py-lg pb-xl mt-lg', className)} {...props}>
			<InViewBackground className="bg-secondary">
				<footer
					className="text-primary px-lg mx-auto"
					aria-labelledby="footer-heading"
				>
					<SiteFooterHeading />
					<SiteFooterContent />
					<Separator className="my-sm" />
					<Disclaimer />
				</footer>
			</InViewBackground>
		</div>
	)
})

SiteFooter.displayName = 'SiteFooter'

export function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />

			<main
				role="main"
				className="rounded-b-large relative w-full max-w-full flex-1"
			>
				<div className="bg-primary -z-1 rounded-large absolute inset-0" />
				<React.Suspense
					fallback={
						<Section className="motion-preset-fade motion-delay-1000 motion-duration-1000 flex min-h-screen justify-center">
							<LoadingAnimation className="size-8" variant="square" />
						</Section>
					}
				>
					{children}
				</React.Suspense>
			</main>

			<SiteFooter />
		</div>
	)
}
