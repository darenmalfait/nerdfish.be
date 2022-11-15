import { format as formatDate } from 'date-fns'
import * as React from 'react'

function DateFormatter({
  dateString,
  format,
}: {
  dateString: string
  format?: string
}) {
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true)
  }, [])
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  const date = new Date(dateString)

  return <time dateTime={dateString}>{formatDate(date, format || 'PP')}</time>
}

export { DateFormatter }
