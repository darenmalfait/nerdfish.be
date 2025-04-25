import { TextSlideUp } from '@repo/design-system/components/text-slide-up'
import { H1, Separator } from '@repo/design-system/components/ui'
import { ArrowRight, Logo } from '@repo/design-system/icons'
import { companyInfo } from '@repo/global-settings/company-info'
import { cx } from '@repo/lib/utils/base'
import * as React from 'react'
import { SocialLinks } from './navigation'
import { Link } from '~/app/components/link'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'

function Disclaimer() {
	const currentYear = new Date().getFullYear()

	return (
		<div className="my-lg gap-md flex w-full flex-col items-center justify-center md:flex-row md:items-start">
			<div className="gap-md flex flex-col">
				<div className="gap-md flex items-center">
					<div>
						<Logo className="h-4 w-auto items-center text-current" />
					</div>
					<div className="text-muted flex justify-start text-sm">
						© {currentYear} {companyInfo.companyName}
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
	return (
		<H1 as="h2" className="mb-xl py-lg text-foreground">
			<Link
				href="/contact"
				className="!text-foreground group"
				aria-label="Let’s work together"
			>
				<TextSlideUp>
					<span className="!text-foreground">
						Let’s work{' '}
						<ArrowRight className="ml-xs group-hover:translate-x-xs group-hover:text-accent inline size-8 transform duration-300 md:size-12 lg:size-16" />
					</span>
					<span className="!text-foreground">together</span>
				</TextSlideUp>
			</Link>
		</H1>
	)
}

function SiteFooterContent() {
	return (
		<div className="my-lg gap-lg grid md:grid-cols-[repeat(4,250px)]">
			<p className="text-muted text-lg lg:text-xl">
				Made by{' '}
				<Link
					className="text-accent cursor-pointer font-medium transition duration-300 hover:opacity-70"
					href="https://www.nerdfish.be"
				>
					nerdfish
				</Link>
				, development with user experience in mind. The code is{' '}
				<Link
					className="text-accent cursor-pointer font-medium transition duration-300 hover:opacity-70"
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
				<span className="text-muted block text-lg leading-tight lg:text-xl lg:leading-tight">
					{companyInfo.companyName}
				</span>
				<Link
					className="text-accent block text-lg leading-tight lg:text-xl lg:leading-tight"
					href={`mailto:${companyInfo.email}`}
				>
					{companyInfo.email}
				</Link>
				<span className="text-muted block text-lg leading-tight lg:text-xl lg:leading-tight">
					{companyInfo.vat}
				</span>
			</div>
		</div>
	)
}

export type FooterProps = React.ComponentProps<'footer'>

export function Footer({ className, ...props }: FooterProps) {
	return (
		<footer
			className={cx('mt-lg py-lg pb-xl lg:pb-sm print:hidden', className)}
			{...props}
		>
			<div
				className="text-foreground container max-w-none"
				aria-labelledby="footer-heading"
			>
				<SiteFooterHeading />
				<SiteFooterContent />
				<Separator className="my-sm" />
				<Disclaimer />
			</div>
		</footer>
	)
}
