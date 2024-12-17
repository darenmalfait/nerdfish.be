'use client'

import { format as formatDate } from 'date-fns/format'

export interface DateFormatterProps {
	dateString: string
	format?: string
}

export function DateFormatter({ dateString, format }: DateFormatterProps) {
	const date = new Date(dateString)

	return <time dateTime={dateString}>{formatDate(date, format ?? 'PP')}</time>
}
