import {
	Button,
	TooltipContent,
	TooltipTrigger,
	Tooltip,
	TooltipProvider,
} from '@repo/design-system/components/ui'
import { PrinterIcon } from '@repo/design-system/icons'
import { cx } from '@repo/lib/utils/base'

import { ImportTimeEntriesButton } from './timesheets-import'

export function TimesheetsToolbar() {
	return (
		<div
			className={cx(
				'print:hidden',
				'rounded-container bg-popover p-xs fixed inset-x-0 z-50 mx-auto w-fit max-w-full',
				'before:empty-content before:rounded-container before:bg-background-muted/50 before:absolute before:inset-0',
				'bottom-lg',
			)}
		>
			<TooltipProvider>
				<ul className="gap-sm flex">
					<li>
						<ImportTimeEntriesButton />
					</li>
					<li>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="button"
									variant="ghost"
									icon
									aria-label="Print"
									onClick={() => window.print()}
								>
									<PrinterIcon className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Print</TooltipContent>
						</Tooltip>
					</li>
				</ul>
			</TooltipProvider>
		</div>
	)
}
