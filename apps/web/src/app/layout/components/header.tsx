import { Button } from '@repo/design-system/components/ui'
import { Logo } from '@repo/design-system/icons'
import { LocaleSwitcher } from '@repo/i18n/components/locale-switcher'
import { MobileNavigation } from './mobile-navigation'
import { MainNavigation } from './navigation'
import { Link } from '~/app/components/link'

export function Header() {
	return (
		<div className="w-full bg-transparent print:hidden">
			<header className="relative z-40 w-full flex-none">
				<div className="container max-w-none">
					<div className="py-mdx relative flex w-full items-center">
						<Button asChild variant="link" className="-mx-sm text-foreground">
							<div>
								<Link href="/" aria-label="Home">
									<Logo className="h-6 w-auto fill-white" />
								</Link>
							</div>
						</Button>
						<div className="mx-auto flex flex-1 items-center">
							<MainNavigation />

							<div className="space-x-sm gap-md flex flex-1 flex-grow justify-end md:flex-grow-0">
								<LocaleSwitcher />
								<MobileNavigation />
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	)
}
