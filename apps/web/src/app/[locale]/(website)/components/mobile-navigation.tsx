'use client'

import { Button } from '@nerdfish/react/button'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@nerdfish/react/drawer'
import { ArrowLeftIcon, Logo, MenuIcon, XIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cn } from '@repo/lib/utils/class'
import { stripPreSlash } from '@repo/lib/utils/string'
import { useState } from 'react'
import { usePathname } from 'routing'
import { useNavigation, type Navigation } from '../hooks/use-navigation'
import { Link } from '~/app/[locale]/common/components/link'

interface NavigationItemProps {
	item: Navigation['main'][number]
	onClick: () => void
}
function NavigationItem({ item, onClick }: NavigationItemProps) {
	const pathname = usePathname()
	if (!item.sub?.length && !item.href) return null

	if (!item.sub?.length) {
		const isActive = stripPreSlash(pathname).startsWith(
			stripPreSlash(item.href),
		)

		return (
			<Link
				onClick={onClick}
				className={cn(
					'group/navigation-item gap-best-friends flex w-fit items-center text-[1.15rem]',
				)}
				href={item.href}
			>
				<span className={cn(isActive && 'border-accent border-b-2')}>
					{item.label}
				</span>
				<div>
					<ArrowLeftIcon className="text-accent size-4 opacity-0 transition-opacity duration-300 group-hover/navigation-item:opacity-100" />
				</div>
			</Link>
		)
	}

	return (
		<div>
			<div className="mb-friends text-xl font-medium">{item.label}</div>
			<ul className={cn('gap-best-friends flex flex-col')}>
				{item.sub.map((subNavItem) => {
					const isActive = stripPreSlash(pathname).startsWith(
						stripPreSlash(subNavItem.href),
					)

					return (
						<li key={subNavItem.label}>
							<Link
								onClick={onClick}
								className={cn(
									'group/navigation-item gap-best-friends text-foreground-muted hover:text-foreground flex w-fit items-center text-[1.15rem]',
								)}
								href={subNavItem.href}
							>
								<span className={cn(isActive && 'border-accent border-b-2')}>
									{subNavItem.label}
								</span>
								<div>
									<ArrowLeftIcon className="text-accent size-4 opacity-0 transition-opacity duration-300 group-hover/navigation-item:opacity-100" />
								</div>
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export function MobileNavigation({ className }: { className?: string }) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const { main: navigation } = useNavigation()
	const t = useTranslations('global')

	return (
		<Drawer direction="left" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
			<DrawerTrigger className="lg:hidden" asChild>
				<Button
					variant="ghost"
					icon
					className={cn(
						'text-foreground hover:bg-background-muted! p-0',
						className,
					)}
				>
					<MenuIcon className="size-4" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="bg-background rounded-r-container! z-50 h-screen backdrop-blur-sm backdrop-saturate-150">
				<DrawerHeader>
					<DrawerTitle className="p-best-friends flex items-center justify-between">
						<Link href="/" onClick={() => setIsDrawerOpen(false)}>
							<Logo className="h-6 w-auto" />
							<span className="sr-only">Navigation</span>
						</Link>
						<Button
							icon
							variant="link"
							className="p-0"
							onClick={() => setIsDrawerOpen(false)}
						>
							<XIcon className="size-4" />
						</Button>
					</DrawerTitle>
					<DrawerDescription className="sr-only">
						{t('navigation.pages')}
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-casual max-w-screen-xsm w-[90vw]">
					<ul className="space-y-friends flex flex-col">
						{navigation.map((mainNavItem) => {
							return (
								<li key={mainNavItem.label}>
									<NavigationItem
										item={mainNavItem}
										onClick={() => setIsDrawerOpen(false)}
									/>
								</li>
							)
						})}
					</ul>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
