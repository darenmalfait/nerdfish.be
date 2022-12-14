import {format as formatDate} from 'date-fns'
import * as React from 'react'

import {useGlobal} from '../../context/global-provider'

function DateFormatter({
  dateString,
  format,
}: {
  dateString: string
  format?: string
}) {
  const {hydrated} = useGlobal()

  // Returns null on first render, so the client and server match
  if (!hydrated) return null

  const date = new Date(dateString)

  return <time dateTime={dateString}>{formatDate(date, format ?? 'PP')}</time>
}

export {DateFormatter}
