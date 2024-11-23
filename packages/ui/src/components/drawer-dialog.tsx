import {
	Dialog,
	DialogContent,
	Drawer,
	DrawerContent,
	useMediaQuery,
} from '@nerdfish/ui'
import * as React from 'react'

export function DrawerDialog({
	open,
	onOpenChange,
	children,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: React.ReactNode
}) {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="rounded-large bg-primary relative overflow-hidden !p-0 transition-all">
					{children}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="bg-primary transition-all">
				{children}
			</DrawerContent>
		</Drawer>
	)
}
