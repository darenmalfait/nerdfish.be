'use client'

import { TextSlideUp } from '@repo/design-system/components/text-slide-up'
import { H1 } from '@repo/design-system/components/ui'
import { ArrowRight, Logo } from '@repo/design-system/icons'
import { companyInfo } from '@repo/global-settings/company-info'
import { useTranslations } from '@repo/i18n/client'
import { cx } from '@repo/lib/utils/base'
import { kebabCase } from '@repo/lib/utils/string'
import * as React from 'react'
import { type NavigationItem, useNavigation } from '../hooks/use-navigation'
import { SocialLinks } from './navigation'
import { Link } from '~/app/components/link'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'

function Disclaimer() {
	const { companyName, email, vat } = companyInfo
	const currentYear = new Date().getFullYear()

	return (
		<div className="text-muted/70 mt-8 flex flex-col items-center gap-2 text-xs sm:mt-0 sm:flex-row sm:gap-x-4 sm:gap-y-0 sm:text-sm">
			<span>
				© {currentYear} {companyName}
			</span>
			<span aria-hidden="true" className="hidden select-none sm:inline">
				•
			</span>
			<span className="sm:ml-0">{email}</span>
			<span aria-hidden="true" className="hidden select-none sm:inline">
				•
			</span>
			<span className="sm:ml-0">{vat}</span>
			{/* Mobile dividers */}
			<span
				aria-hidden="true"
				className="bg-muted/30 block h-px w-4 sm:hidden"
			/>
			<span
				aria-hidden="true"
				className="bg-muted/30 block h-px w-4 sm:hidden"
			/>
		</div>
	)
}

function SiteFooterHeading() {
	return (
		<H1 as="h2" className="mb-xl py-lg text-foreground">
			<Link
				href="/contact"
				className="!text-foreground group"
				aria-label="Let's work together"
			>
				<TextSlideUp>
					<span className="!text-foreground">
						Let&apos;s work
						<ArrowRight className="ml-xs group-hover:translate-x-xs group-hover:text-accent inline size-8 transform duration-300 md:size-12 lg:size-16" />
					</span>
					<span className="!text-foreground">together</span>
				</TextSlideUp>
			</Link>
		</H1>
	)
}

function SiteFooterContent() {
	const t = useTranslations('footer')
	const { main: navigation } = useNavigation()

	const navItemsWithoutSubItems = React.useCallback(
		(items: NavigationItem[]) => {
			return items.filter((item) => !item.sub)
		},
		[],
	)

	const navItemsWithSubItems = React.useCallback((items: NavigationItem[]) => {
		return items.filter((item) => item.sub)
	}, [])

	return (
		<div className="gap-lg flex w-full flex-col items-start justify-between">
			<section
				className="w-full text-center lg:w-1/2 lg:text-left"
				aria-labelledby="footer-heading"
			>
				<h2 className="mb-sm" id="footer-heading">
					<Logo className="h-12 w-auto items-center text-current" />
					<span className="sr-only">Nerdfish</span>
				</h2>
				<p className="max-w-xl" lang="en">
					Development with user experience in mind. The code of this website is{' '}
					<Link
						className="text-accent cursor-pointer font-medium transition duration-300 hover:opacity-70"
						href="https://github.com/darenmalfait/nerdfish.be"
						target="_blank"
					>
						open-source
					</Link>
					.
				</p>
			</section>

			<section
				className="grid w-full max-w-5xl place-items-center gap-12 text-center sm:text-left"
				aria-label="Footer navigation and links"
			>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:w-full">
					<div className="grid gap-8 sm:col-span-2 sm:grid-cols-2 md:col-span-1 md:grid-cols-1">
						<section
							className="flex flex-col items-center gap-2 sm:items-start"
							aria-labelledby="follow-us-heading"
						>
							<h2
								id="follow-us-heading"
								className="text-base font-semibold capitalize"
							>
								{t('follow-us')}
							</h2>
							<div className="-mx-sm">
								<SocialLinks />
							</div>
						</section>
						<section className="flex flex-col gap-2">
							<nav aria-label="Page navigation">
								<ul className="gap-sm grid">
									{navItemsWithoutSubItems(navigation).map((item) => (
										<li key={item.label}>
											<Link href={item.href} className="font-semibold">
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</section>
					</div>
					{navItemsWithSubItems(navigation).map((item) => (
						<nav
							key={item.label}
							className="flex flex-col gap-2"
							aria-labelledby={`${kebabCase(item.label)}-heading`}
						>
							<h2
								id={`${kebabCase(item.label)}-heading`}
								className="text-base font-semibold"
							>
								{item.label}
							</h2>
							<ul className="gap-sm text-muted grid">
								{item.sub?.map((subItem) => (
									<li key={subItem.label}>
										<Link href={subItem.href} className="font-normal">
											{subItem.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>
			</section>
			<section
				className="grid w-full grid-cols-[1fr_auto] items-center gap-2"
				aria-label="Copyright information"
			>
				<div className="gap-lg flex w-full flex-col justify-between md:flex-row md:items-center">
					<p className="flex justify-center gap-2 lg:justify-start">
						Made by
						<Link
							className="text-accent cursor-pointer font-medium transition duration-300 hover:opacity-70"
							href="https://www.nerdfish.be"
						>
							nerdfish
						</Link>
					</p>
					<div className="flex justify-center md:justify-end">
						<ThemeToggle />
					</div>
				</div>
			</section>
		</div>
	)
}

export type FooterProps = React.ComponentProps<'footer'>

export function Footer({ className, ...props }: FooterProps) {
	return (
		<footer
			className={cx('mt-lg py-lg pb-xl print:hidden', className)}
			{...props}
		>
			<div className="container">
				<SiteFooterHeading />
				<SiteFooterContent />
				<Disclaimer />
			</div>
		</footer>
	)
}
