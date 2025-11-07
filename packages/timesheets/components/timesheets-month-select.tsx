import { Button } from '@nerdfish/react/button'
import { ButtonGroup } from '@nerdfish/react/button-group'
import {
	TZDate,
	addMonths,
	format,
	formatISO,
	startOfMonth,
} from '@repo/calendar/utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@repo/design-system/icons'
import { useTimesheetsParams } from '../hooks/use-timesheets-params'
import { TIMEZONE } from '../utils'

type TimesheetsMonthSelectProps = {
	className?: string
	dateFormat?: string
}

export function TimesheetsMonthSelect({
	className,
	dateFormat = 'MMM',
}: TimesheetsMonthSelectProps) {
	const { date, setParams } = useTimesheetsParams()
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
			<Button variant="secondary" onClick={selectPrevMonth}>
				<ChevronLeftIcon className="size-4" />
			</Button>
			<Button variant="secondary" className="pointer-events-none">
				<span className="w-full text-center">
					{format(currentDate, dateFormat)}
				</span>
			</Button>
			<Button variant="secondary" onClick={selectNextMonth}>
				<ChevronRightIcon className="size-4" />
			</Button>
		</ButtonGroup>
	)
}
