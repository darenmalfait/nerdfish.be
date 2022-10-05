import { useCatch } from '@remix-run/react'
import * as React from 'react'

import { FourOhFour } from '~/components/common'

export function GenericCatchBoundary() {
  const caught = useCatch()
  let message = caught.statusText
  if (typeof caught.data === 'string') {
    message = caught.data
  }

  return <FourOhFour title={message} />
}
