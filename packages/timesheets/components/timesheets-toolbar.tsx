import { Button } from '@nerdfish/react/button'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from '@nerdfish/react/tooltip'
import { PrinterIcon } from '@repo/design-system/icons'
import { cn } from '@repo/lib/utils/class'

import { ImportTimeEntriesButton } from './timesheets-import'

export function TimesheetsToolbar() {
	return (
		<div
			className={cn(
				'print:hidden',
				'rounded-container bg-popover p-bff fixed inset-x-0 z-50 mx-auto w-fit max-w-full',
				'before:empty-content before:rounded-container before:bg-background-muted/50 before:absolute before:inset-0',
				'bottom-lg',
			)}
		>
			<TooltipProvider>
				<ul className="gap-best-friends flex">
					<li>
						<ImportTimeEntriesButton />
					</li>
					<li>
						<Tooltip>
							<Button
								type="button"
								variant="ghost"
								icon
								aria-label="Print"
								onClick={() => window.print()}
								render={
									<TooltipTrigger>
										<PrinterIcon className="h-4 w-4" />
									</TooltipTrigger>
								}
							/>
							<TooltipContent>Print</TooltipContent>
						</Tooltip>
					</li>
				</ul>
			</TooltipProvider>
		</div>
	)
}
