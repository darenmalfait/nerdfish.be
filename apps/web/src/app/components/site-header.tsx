'use client'

import { Button } from '@nerdfish/react/button'
import { Particles } from '@repo/design-system/components/particles'
import { Logo } from '@repo/design-system/icons'
import { LocaleSwitcher } from '@repo/i18n/components/locale-switcher'
import { cn } from '@repo/lib/utils/class'
import { type ComponentProps } from 'react'
import { MobileNavigation } from './mobile-navigation'
import { ProgressiveBlur } from './progressive-blur'
import { SiteNavigation } from './site-navigation'
import { Link } from '~/app/components/link'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'

function HeaderSection({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'rounded-base gap-friends relative flex items-center justify-center',

				// desktop only styling
				'lg:border-border lg:p-friends! lg:bg-background-secondary lg:border',
				className,
			)}
			{...props}
		/>
	)
}

export function SiteHeader() {
	return (
		<div className="sticky top-0 z-10 w-full bg-transparent print:hidden">
			<ProgressiveBlur
				className="pointer-events-none absolute inset-0 h-full w-full"
				direction="top"
				blurIntensity={1}
			/>
			<header className="relative w-full flex-none">
				<div className="container max-w-none">
					<div className="py-friends">
						<div
							className={cn(
								'gap-best-friends relative flex w-full flex-row-reverse items-center justify-between lg:flex-row',

								// mobile only styling
								'border-border p-friends bg-background-secondary rounded-base gap-friends relative flex items-center justify-center border',
								'lg:border-none lg:bg-transparent lg:p-0',
							)}
						>
							<div className="flex flex-1 items-center justify-end lg:justify-start">
								<HeaderSection>
									<Button
										render={
											<div>
												<Link href="/" aria-label="Home">
													<Logo className="h-6 w-auto fill-white" />
												</Link>
												<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/header-logo:opacity-100">
													<Particles />
												</div>
											</div>
										}
										variant="link"
										className="-mx-best-friends text-foreground group/header-logo relative"
									/>
									<SiteNavigation />
								</HeaderSection>
							</div>
							<div className="mx-auto flex flex-1 items-center justify-start lg:justify-end">
								<div className="flex w-fit flex-row-reverse justify-end lg:justify-start">
									<HeaderSection className="flex-row-reverse lg:flex-row">
										<ThemeToggle
											border={false}
											className="hidden sm:inline-flex"
										/>
										<LocaleSwitcher variant="ghost" className="xsm:block" />
										<MobileNavigation />
									</HeaderSection>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	)
}
