'use client'

import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@repo/design-system/components/ui'
import { Logo, MenuIcon } from '@repo/design-system/icons'
import { useTranslations } from '@repo/i18n/client'
import { cx } from '@repo/lib/utils/base'
import { stripPreSlash } from '@repo/lib/utils/string'
import * as React from 'react'
import { usePathname } from 'routing'
import { type Navigation, useNavigation } from '../hooks/use-navigation'
import { Link } from '~/app/components/link'

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
				className={cx('text-[1.15rem]', isActive && 'border-brand border-b-2')}
				href={item.href}
			>
				{item.label}
			</Link>
		)
	}

	return (
		<div>
			<div className="mb-md text-xl font-medium">{item.label}</div>
			<ul className={cx('gap-sm flex flex-col')}>
				{item.sub.map((subNavItem) => {
					const isActive = stripPreSlash(pathname).startsWith(
						stripPreSlash(subNavItem.href),
					)

					return (
						<li key={subNavItem.label}>
							<Link
								onClick={onClick}
								className={cx(
									'text-foreground/80 text-[1.15rem]',
									isActive && 'border-brand border-b-2',
								)}
								href={subNavItem.href}
							>
								{subNavItem.label}
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export function MobileNavigation() {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
	const { main: navigation } = useNavigation()
	const t = useTranslations('global')

	return (
		<Drawer direction="left" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
			<DrawerTrigger asChild className="lg:hidden">
				<Button variant="link" className="text-foreground mr-md p-0">
					<MenuIcon className="size-6" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="bg-popover">
				<DrawerHeader>
					<DrawerTitle className="p-md">
						<Logo className="h-6 w-auto" />
						<span className="sr-only">Navigation</span>
					</DrawerTitle>
					<DrawerDescription className="sr-only">
						{t('navigation.pages')}
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-lg max-w-screen-xsm w-screen">
					<ul className="space-y-md flex flex-col">
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
