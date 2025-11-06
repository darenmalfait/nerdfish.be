import { Dialog, DialogContent } from '@nerdfish/react/dialog'
import { Drawer, DrawerContent } from '@nerdfish/react/drawer'
import { type ReactNode } from 'react'
import { useMediaQuery } from '../hooks/use-media-query'
export interface DrawerDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: ReactNode
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
				<DialogContent className="rounded-container bg-background relative overflow-hidden p-0! transition-all">
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
