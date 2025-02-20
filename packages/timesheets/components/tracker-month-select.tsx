import { TZDate } from '@date-fns/tz'
import { Button, ButtonGroup } from '@repo/design-system/components/ui'
import { ChevronLeftIcon, ChevronRightIcon } from '@repo/design-system/icons'
import { addMonths, format, formatISO, startOfMonth } from 'date-fns'
import { useTrackerParams } from '../hooks/use-tracker-params'
import { TIMEZONE } from '../utils'

type TrackerMonthSelectProps = {
	className?: string
	dateFormat?: string
}

export function TrackerMonthSelect({
	className,
	dateFormat = 'MMM',
}: TrackerMonthSelectProps) {
	const { date, setParams } = useTrackerParams()
	const currentDate = date
		? new TZDate(date, TIMEZONE)
		: new TZDate(new Date(), TIMEZONE)

	const selectPrevMonth = () => {
		return setParams(
			{
				date: formatISO(startOfMonth(addMonths(currentDate, -1)), {
					representation: 'date',
				}),
			},
			{ shallow: false },
		)
	}

	const selectNextMonth = () => {
		return setParams(
			{
				date: formatISO(startOfMonth(addMonths(currentDate, 1)), {
					representation: 'date',
				}),
			},
			{ shallow: false },
		)
	}

	return (
		<ButtonGroup className={className}>
			<Button size="icon" onClick={selectPrevMonth}>
				<ChevronLeftIcon className="size-4" />
			</Button>
			<Button asChild className="pointer-events-none">
				<span className="w-full text-center">
					{format(currentDate, dateFormat)}
				</span>
			</Button>
			<Button size="icon" onClick={selectNextMonth}>
				<ChevronRightIcon className="size-4" />
			</Button>
		</ButtonGroup>
	)
}
