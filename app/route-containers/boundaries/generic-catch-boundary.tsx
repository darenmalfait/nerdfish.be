import * as React from 'react'
import { useCatch } from 'remix'

import { FourOhFour } from '~/components/common'

export function GenericCatchBoundary() {
  const caught = useCatch()
  let message = caught.statusText
  if (typeof caught.data === 'string') {
    message = caught.data
  }

  return <FourOhFour title={message} />
}
