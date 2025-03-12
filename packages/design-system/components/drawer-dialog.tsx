import type * as React from 'react'
import {
	Dialog,
	DialogContent,
	Drawer,
	DrawerContent,
	useMediaQuery,
} from './ui'

export interface DrawerDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: React.ReactNode
}

export function DrawerDialog({
	open,
	onOpenChange,
	children,
}: DrawerDialogProps) {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="rounded-container bg-background relative overflow-hidden !p-0 transition-all">
					{children}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer repositionInputs={false} open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="bg-background transition-all">
				{children}
			</DrawerContent>
		</Drawer>
	)
}
