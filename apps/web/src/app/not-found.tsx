import * as React from 'react'

import {ErrorPage} from './_components/errors'

export default function Custom404() {
  return (
    <ErrorPage
      title="404 - Page doesn't exist"
      subTitle="Sorry, we couldn't find the page you were looking for."
    />
  )
}
