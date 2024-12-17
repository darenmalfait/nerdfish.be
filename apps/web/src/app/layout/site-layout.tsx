'use client'

import { cx } from '@nerdfish/utils'
import { InViewBackground } from '@repo/design-system/components/in-view-background'
import { Section } from '@repo/design-system/components/section'
import { TextSlideUp } from '@repo/design-system/components/text-slide-up'
import {
	H1,
	LoadingAnimation,
	Separator,
} from '@repo/design-system/components/ui'
import { ArrowRight, Logo } from '@repo/design-system/lib/icons'
import Link from 'next/link'
import * as React from 'react'
import { ThemeToggle } from '../theme/components/theme-toggle'
import { SocialLinks } from './components/navigation'
import { SiteHeader } from './components/site-header'
import { useGlobal } from '~/app/global-provider'

function Disclaimer() {
	const { companyInfo } = useGlobal()

	const currentYear = new Date().getFullYear()

	return (
		<div className="my-lg gap-md flex w-full flex-col items-center justify-center md:flex-row md:items-start">
			<div className="gap-md flex flex-col">
				<div className="gap-md flex items-center">
					<div>
						<Logo className="h-4 w-auto items-center text-current" />
					</div>
					<div className="text-primary/80 flex justify-start text-sm">
						© {currentYear} {companyInfo?.companyName}
					</div>
				</div>
				<div className="-mx-sm flex justify-center md:justify-start">
					<SocialLinks />
				</div>
			</div>

			<div className="flex flex-1 justify-center md:justify-end">
				<ThemeToggle />
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
				className="!text-primary group"
				aria-label="Let’s work together"
			>
				<TextSlideUp>
					<span className="!text-primary">
						Let’s work{' '}
						<ArrowRight className="ml-xs group-hover:translate-x-xs group-hover:text-accent inline size-8 transform duration-300 md:size-12 lg:size-16" />
					</span>
					<span className="!text-primary">together</span>
				</TextSlideUp>
			</Link>
		</H1>
	)
}

function SiteFooterContent() {
	const { companyInfo } = useGlobal()

	return (
		<div className="my-lg gap-lg grid md:grid-cols-[repeat(4,250px)]">
			<p className="text-primary/80 text-lg lg:text-xl">
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

			<div className="mb-md space-y-xs">
				<h3 className="text-lg font-semibold leading-tight lg:text-xl lg:leading-tight">
					Get in touch
				</h3>
				<span className="text-primary/80 block text-lg leading-tight lg:text-xl lg:leading-tight">
					{companyInfo?.companyName}
				</span>
				<Link
					className="text-primary/80 block text-lg leading-tight lg:text-xl lg:leading-tight"
					href={`mailto:${companyInfo?.email}`}
				>
					{companyInfo?.email}
				</Link>
				<span className="text-primary/80 block text-lg leading-tight lg:text-xl lg:leading-tight">
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
			className={cx('mt-lg py-lg pb-xl lg:pb-sm print:hidden', className)}
			{...props}
		>
			<InViewBackground className="bg-secondary">
				<footer
					className="text-primary container max-w-none"
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

			<main className="rounded-b-container relative w-full max-w-full flex-1">
				<div className="-z-1 rounded-container bg-primary absolute inset-0" />
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
