'use client'

import { format as formatDate } from 'date-fns/format'

function DateFormatter({
	dateString,
	format,
}: {
	dateString: string
	format?: string
}) {
	const date = new Date(dateString)

	return <time dateTime={dateString}>{formatDate(date, format ?? 'PP')}</time>
}

export { DateFormatter }
