import { TZDate } from '@date-fns/tz'
import { Button, ButtonGroup } from '@repo/design-system/components/ui'
import { ChevronLeftIcon, ChevronRightIcon } from '@repo/design-system/icons'
import { useHotkeys } from '@repo/lib/hooks/use-hotkeys'
import { addDays, formatISO, subDays } from 'date-fns'
import { useTrackerParams } from '../hooks/use-tracker-params'
import { formatDateRange, getTrackerDates, TIMEZONE } from '../utils'

type TrackerDaySelectProps = {
	className?: string
}

export function TrackerDaySelect({ className }: TrackerDaySelectProps) {
	const { setParams, range, selectedDate } = useTrackerParams()
	const currentDate = getTrackerDates(range, selectedDate)

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
