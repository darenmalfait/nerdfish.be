'use client'

import { Button } from '@nerdfish/react/button'
import { Particles } from '@repo/design-system/components/particles'
import { Logo } from '@repo/design-system/icons'
import { LocaleSwitcher } from '@repo/i18n/components/locale-switcher'
import { MobileNavigation } from './mobile-navigation'
import { ProgressiveBlur } from './progressive-blur'
import { SiteNavigation } from './site-navigation'
import { Link } from '~/app/components/link'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'

export function SiteHeader() {
	return (
		<div className="sticky top-0 z-40 w-full bg-transparent print:hidden">
			<ProgressiveBlur
				className="pointer-events-none absolute inset-0 h-full w-full"
				direction="top"
				blurIntensity={1}
			/>
			<header className="relative z-50 w-full flex-none">
				<div className="container max-w-none">
					<div className="py-friends gap-best-friends relative flex w-full flex-row-reverse items-center justify-between lg:flex-row">
						<div className="flex flex-1 items-center justify-end lg:justify-start">
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
						</div>
						<SiteNavigation />
						<div className="mx-auto flex flex-1 items-center justify-end">
							<div className="gap-friends flex w-fit flex-1 flex-row-reverse justify-end lg:justify-start">
								<ThemeToggle className="hidden sm:flex" />
								<LocaleSwitcher className="xsm:flex hidden" />
								<MobileNavigation />
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	)
}
