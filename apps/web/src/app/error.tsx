'use client'

import * as React from 'react'

import {ErrorPage} from './_components/errors'

export default function Error({error}: {error?: Error}) {
  return (
    <ErrorPage
      title="500 - Oh no, something went wrong!"
      subTitle={error?.message}
    />
  )
}
