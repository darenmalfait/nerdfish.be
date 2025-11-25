import { Button } from '@nerdfish/react/button'
import { ButtonGroup } from '@nerdfish/react/button-group'
import { TZDate, addDays, formatISO, subDays } from '@repo/calendar/utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@repo/design-system/icons'
import { useHotkeys } from '@repo/lib/hooks/use-hotkeys'
import { cn } from '@repo/lib/utils/class'
import { useTimesheetsParams } from '../hooks/use-timesheets-params'
import { formatDateRange, getTimesheetsDates, TIMEZONE } from '../utils'

type TimesheetsDaySelectProps = {
	className?: string
}

export function TimesheetsDaySelect({ className }: TimesheetsDaySelectProps) {
	const { setParams, range, selectedDate } = useTimesheetsParams()
	const currentDate = getTimesheetsDates(range, selectedDate)

	const selectPrevDay = () => {
		if (currentDate[0]) {
			const prevDay = new TZDate(subDays(currentDate[0], 1), TIMEZONE)
			return setParams({
				selectedDate: formatISO(prevDay, { representation: 'date' }),
				range: null,
			})
		}
	}

	const selectNextDay = () => {
		if (currentDate[0]) {
			const nextDay = new TZDate(addDays(currentDate[0], 1), TIMEZONE)
			return setParams({
				selectedDate: formatISO(nextDay, { representation: 'date' }),
				range: null,
			})
		}
	}

	useHotkeys('arrowLeft', selectPrevDay)
	useHotkeys('arrowRight', selectNextDay)

	return (
		<ButtonGroup className={cn('w-full', className)}>
			<Button variant="secondary" onClick={selectPrevDay}>
				<ChevronLeftIcon className="size-4" />
			</Button>
			<Button
				variant="secondary"
				className="pointer-events-none"
				render={
					<span className="w-full rounded-none text-center">
						{currentDate[0]
							? formatDateRange(
									range
										? [
												new TZDate(currentDate[0].getTime(), TIMEZONE),
												new TZDate(
													currentDate[1]?.getTime() ?? currentDate[0].getTime(),
													TIMEZONE,
												),
											]
										: [new TZDate(currentDate[0].getTime(), TIMEZONE)],
								)
							: null}
					</span>
				}
			/>
			<Button variant="secondary" onClick={selectNextDay}>
				<ChevronRightIcon className="size-4" />
			</Button>
		</ButtonGroup>
	)
}
