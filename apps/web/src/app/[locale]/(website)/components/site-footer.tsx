'use client'

import { TextSlideUp } from '@repo/design-system/components/text-slide-up'
import { ArrowRight, Logo } from '@repo/design-system/icons'
import { companyInfo } from '@repo/global-settings/company-info'
import { useTranslations } from '@repo/i18n/client'
import { LocaleSwitcher } from '@repo/i18n/components/locale-switcher'
import { cn } from '@repo/lib/utils/class'
import { kebabCase } from '@repo/lib/utils/string'
import { type ComponentProps, useCallback } from 'react'
import { type NavigationItem, useNavigation } from '../hooks/use-navigation'
import { SocialLinks } from './site-navigation'
import { Link } from '~/app/[locale]/common/components/link'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'

function Disclaimer() {
	const { companyName, email, vat } = companyInfo
	const currentYear = new Date().getFullYear()

	return (
		<div className="text-muted/70 gap-bff mt-8 flex flex-col items-center justify-center text-xs sm:mt-0 sm:flex-row sm:gap-x-4 sm:gap-y-0 sm:text-sm md:justify-self-start">
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
				className="bg-background-muted/30 block h-px w-4 sm:hidden"
			/>
			<span
				aria-hidden="true"
				className="bg-background-muted/30 block h-px w-4 sm:hidden"
			/>
		</div>
	)
}

function SiteFooterHeading() {
	return (
		<h2 className="typography-heading-lg mb-acquaintances py-lg text-foreground">
			<Link
				href="/contact"
				className="!text-foreground group"
				aria-label="Let's work together"
			>
				<TextSlideUp>
					<span className="!text-foreground">
						Let&apos;s work
						<ArrowRight className="ml-casual group-hover:translate-x-bff group-hover:text-accent inline size-8 transform duration-300 md:size-12 lg:size-16" />
					</span>
					<span className="text-foreground!">together</span>
				</TextSlideUp>
			</Link>
		</h2>
	)
}

function SiteFooterContent() {
	const t = useTranslations('footer')
	const { main: navigation } = useNavigation()

	const navItemsWithoutSubItems = useCallback((items: NavigationItem[]) => {
		return items.filter((item) => !item.sub)
	}, [])

	const navItemsWithSubItems = useCallback((items: NavigationItem[]) => {
		return items.filter((item) => item.sub)
	}, [])

	return (
		<div className="gap-casual flex w-full flex-col items-start justify-between">
			<section
				className="w-full text-center md:text-left lg:w-1/2"
				aria-labelledby="footer-heading"
			>
				<h2 className="mb-best-friends" id="footer-heading">
					<Logo className="mx-auto h-12 w-auto items-center text-current md:mx-0" />
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
				className="gap-casual grid w-full text-center md:max-w-5xl md:text-left lg:place-items-center"
				aria-label="Footer navigation and links"
			>
				<div className="gap-friends grid grid-cols-1 md:grid-cols-2 lg:w-full lg:grid-cols-3">
					<div className="gap-casual grid md:col-span-1 md:grid-cols-1 lg:grid-cols-1">
						<section
							className="gap-best-friends flex flex-col items-center md:items-start"
							aria-labelledby="follow-us-heading"
						>
							<h2
								id="follow-us-heading"
								className="text-base font-semibold capitalize"
							>
								{t('follow-us')}
							</h2>
							<div>
								<SocialLinks />
							</div>
						</section>
						<section className="gap-best-friends flex flex-col">
							<nav aria-label="Page navigation">
								<ul className="gap-best-friends grid">
									{navItemsWithoutSubItems(navigation).map((item) => (
										<li key={item.label}>
											<Link
												href={item.href}
												className="font-semibold capitalize"
											>
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
							className="gap-bff flex flex-col"
							aria-labelledby={`${kebabCase(item.label)}-heading`}
						>
							<h2
								id={`${kebabCase(item.label)}-heading`}
								className="text-base font-semibold"
							>
								{item.label}
							</h2>
							<ul className="gap-best-friends text-foreground-muted grid">
								{item.sub?.map((subItem) => (
									<li key={subItem.label}>
										<Link
											href={subItem.href}
											className="font-normal capitalize"
										>
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
				className="gap-bff grid w-full grid-cols-[1fr_auto] items-center"
				aria-label="Copyright information"
			>
				<div className="gap-casual flex w-full flex-col justify-between md:flex-row md:items-center">
					<p className="gap-bff flex justify-center lg:justify-start">
						Made by
						<Link
							className="text-accent cursor-pointer font-medium transition duration-300 hover:opacity-70"
							href="https://www.nerdfish.be"
						>
							nerdfish
						</Link>
					</p>
					<div className="gap-friends mb-casual flex justify-center md:justify-end">
						<LocaleSwitcher />
						<ThemeToggle />
					</div>
				</div>
			</section>
		</div>
	)
}

export type FooterProps = ComponentProps<'footer'>

export function SiteFooter({ className, ...props }: FooterProps) {
	return (
		<footer
			className={cn('mt-casual py-lg pb-acquaintances print:hidden', className)}
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
