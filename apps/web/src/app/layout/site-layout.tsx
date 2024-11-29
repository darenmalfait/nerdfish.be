'use client'

import { H1, LoadingAnimation, Separator } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { InViewBackground } from '@repo/ui/components/in-view-background'
import { Section } from '@repo/ui/components/section'
import { TextSlideUp } from '@repo/ui/components/text-slide-up'
import { ArrowRight, Logo } from '@repo/ui/icons'
import Link from 'next/link'
import * as React from 'react'
import { useGlobal } from '~/app/global-provider'
import { SocialLinks } from './components/navigation'
import { SiteHeader } from './components/site-header'

function Disclaimer() {
	const { companyInfo } = useGlobal()

	const currentYear = new Date().getFullYear()

	return (
		<div className="my-lg flex w-full flex-col items-center justify-center gap-lg md:flex-row">
			<div className="flex items-center gap-lg">
				<div>
					<Logo className="h-4 w-auto items-center text-current" />
				</div>
				<div className="flex justify-start text-muted text-sm">
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
		<H1 as="h2" className="mb-xl py-lg text-primary">
			<Link
				href={paths?.contact ?? '/'}
				className="group"
				aria-label="Let’s work together"
			>
				<TextSlideUp>
					<span>
						Let’s work{' '}
						<ArrowRight className="ml-xs inline size-8 transform duration-300 group-hover:translate-x-xs group-hover:text-accent md:size-12 lg:size-16" />
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
		<div className="my-lg grid gap-lg md:grid-cols-[repeat(4,250px)]">
			<p className="text-lg text-muted lg:text-xl">
				Made by{' '}
				<Link
					className="cursor-pointer font-medium text-primary transition duration-300 hover:opacity-70"
					href="https://www.nerdfish.be"
				>
					nerdfish
				</Link>
				, development with user experience in mind. The code is{' '}
				<Link
					className="cursor-pointer font-medium text-primary transition duration-300 hover:opacity-70"
					href="https://github.com/darenmalfait/nerdfish.be"
					target="_blank"
				>
					open-source
				</Link>
				.
			</p>

			<div className="mb-md space-y-xs">
				<h3 className="font-semibold text-lg leading-tight lg:text-xl">
					Get in touch
				</h3>
				<span className="block text-lg text-muted leading-tight lg:text-xl">
					{companyInfo?.companyName}
				</span>
				<Link
					className="block text-lg text-muted leading-tight lg:text-xl"
					href={`mailto:${companyInfo?.email}`}
				>
					{companyInfo?.email}
				</Link>
				<span className="block text-lg text-muted leading-tight lg:text-xl">
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
			className={cx('mt-lg py-lg pb-xl lg:pb-sm', className)}
			{...props}
		>
			<InViewBackground className="bg-secondary">
				<footer
					className="container max-w-none text-primary"
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

			<main className="relative w-full max-w-full flex-1 rounded-b-container">
				<div className="-z-1 absolute inset-0 rounded-container bg-primary" />
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
