import { formatISO } from '@repo/calendar/utils'
import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsString,
	parseAsStringLiteral,
	useQueryStates,
} from 'nuqs'

export function useTimesheetsParams(initialDate?: string) {
	const [params, setParams] = useQueryStates({
		date: parseAsString.withDefault(
			initialDate ?? formatISO(new Date(), { representation: 'date' }),
		),
		create: parseAsBoolean,
		projectId: parseAsString,
		update: parseAsBoolean,
		selectedDate: parseAsString,
		range: parseAsArrayOf(parseAsString),
		statuses: parseAsArrayOf(
			parseAsStringLiteral(['completed', 'in_progress']),
		),
		start: parseAsString,
		end: parseAsString,
	})

	return {
		...params,
		range: params.range,
		setParams,
	}
}
