import * as React from 'react'

import { ServerError } from '~/components/common'

export function GenericErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <main>
      <ServerError error={error} />
    </main>
  )
}
