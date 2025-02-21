import { TZDate, addDays, formatISO, subDays } from '@repo/calendar/utils'
import { Button, ButtonGroup } from '@repo/design-system/components/ui'
import { ChevronLeftIcon, ChevronRightIcon } from '@repo/design-system/icons'
import { useHotkeys } from '@repo/lib/hooks/use-hotkeys'
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
		<ButtonGroup className={className}>
			<Button variant="secondary" size="icon" onClick={selectPrevDay}>
				<ChevronLeftIcon className="size-4" />
			</Button>
			<Button variant="secondary" asChild className="pointer-events-none">
				<span className="w-full text-center">
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
			</Button>
			<Button variant="secondary" size="icon" onClick={selectNextDay}>
				<ChevronRightIcon className="size-4" />
			</Button>
		</ButtonGroup>
	)
}
