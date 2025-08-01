import { Button } from '@repo/design-system/components/ui'
import { Logo } from '@repo/design-system/icons'
import { LocaleSwitcher } from '@repo/i18n/components/locale-switcher'
import { MobileNavigation } from './mobile-navigation'
import { MainNavigation } from './navigation'
import { Link } from '~/app/components/link'
import { ThemeToggle } from '~/app/theme/components/theme-toggle'

export function Header() {
	return (
		<div className="w-full bg-transparent print:hidden">
			<header className="relative z-40 w-full flex-none">
				<div className="container max-w-none">
					<div className="py-mdx gap-sm relative flex w-full flex-row-reverse items-center justify-between lg:flex-row">
						<div className="flex flex-1 items-center justify-end lg:justify-start">
							<Button asChild variant="link" className="-mx-sm text-foreground">
								<div>
									<Link href="/" aria-label="Home">
										<Logo className="h-6 w-auto fill-white" />
									</Link>
								</div>
							</Button>
						</div>
						<MainNavigation />
						<div className="mx-auto flex flex-1 items-center justify-end">
							<div className="gap-md flex flex-1 flex-grow flex-row-reverse justify-end lg:flex-grow-0">
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
