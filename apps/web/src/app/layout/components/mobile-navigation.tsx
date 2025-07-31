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
import { MenuIcon } from '@repo/design-system/icons'
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
		<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
			<DrawerTrigger asChild className="lg:hidden">
				<Button variant="link" className="text-foreground m p-0">
					<MenuIcon className="size-6" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="sr-only">
					<DrawerTitle>Navigation</DrawerTitle>
					<DrawerDescription>{t('navigation.pages')}</DrawerDescription>
				</DrawerHeader>
				<div className="p-lg">
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
