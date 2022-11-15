import { parseISO, format as formatDate } from 'date-fns'

function DateFormatter({
  dateString,
  format,
}: {
  dateString: string
  format?: string
}) {
  const date = parseISO(dateString)

  return (
    <time suppressHydrationWarning dateTime={dateString}>
      {formatDate(date, format || 'PP')}
    </time>
  )
}

export { DateFormatter }
