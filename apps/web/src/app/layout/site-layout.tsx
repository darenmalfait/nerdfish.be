'use client'

import { LoadingAnimation, H1, Separator } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { Section, InViewBackground, TextSlideUp } from '@repo/ui/components'
import { ArrowRight, Logo } from '@repo/ui/icons'
import Link from 'next/link'
import * as React from 'react'
import { SocialLinks } from './navigation'
import { SiteHeader } from './site-header'
import { useGlobal } from '~/app/global-provider'

function Disclaimer() {
	const { companyInfo } = useGlobal()

	const currentYear = new Date().getFullYear()

	return (
		<div className="gap-lg my-lg flex w-full flex-col items-center justify-center md:flex-row">
			<div className="gap-lg flex items-center">
				<div>
					<Logo className="h-4 w-auto items-center text-current" />
				</div>
				<div className="text-muted flex justify-start text-sm">
					© {currentYear} {companyInfo?.companyName}
				</div>
			</div>

			<div className="flex flex-1 justify-end">
				<SocialLinks />
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
		<div className="gap-lg my-lg grid md:grid-cols-[repeat(4,250px)]">
			<p className="text-muted text-lg lg:text-xl">
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

			<div className="space-y-xs mb-md">
				<h3 className="text-xl font-semibold leading-tight">Get in touch</h3>
				<span className="text-muted block text-xl leading-tight">
					{companyInfo?.companyName}
				</span>
				<Link
					className="text-muted block text-xl leading-tight"
					href={`mailto:${companyInfo?.email}`}
				>
					{companyInfo?.email}
				</Link>
				<span className="text-muted block text-xl leading-tight">
					{companyInfo?.vat}
				</span>
			</div>
		</div>
	)
}

const SiteFooter = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cx('py-lg pb-xl lg:pb-sm mt-lg', className)}
			{...props}
		>
			<InViewBackground className="bg-secondary">
				<footer
					className="text-primary px-md mx-auto w-full"
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
				className="rounded-b-container relative w-full max-w-full flex-1"
			>
				<div className="bg-primary -z-1 rounded-container absolute inset-0" />
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
