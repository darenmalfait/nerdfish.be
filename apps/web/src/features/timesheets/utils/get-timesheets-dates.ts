import { byTime } from './by-time'

export function getTimesheetsDates(
	range: string[] | null,
	selectedDate: string | null,
): Date[] {
	if (range) {
		return range.toSorted(byTime).map((dateString) => new Date(dateString))
	}

	if (selectedDate) {
		return [new Date(selectedDate)]
	}

	return [new Date()]
}
