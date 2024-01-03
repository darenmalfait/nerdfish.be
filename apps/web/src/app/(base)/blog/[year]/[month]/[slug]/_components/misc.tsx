'use client'

import * as React from 'react'

import {useGlobal} from '~/app/(base)/global-provider'
import {BackLink} from '~/components/arrow-link'

export function BackToBlog() {
  const {paths} = useGlobal()

  if (!paths?.blog) return null

  return <BackLink href={paths.blog}>All blog articles</BackLink>
}
