'use client'

import * as React from 'react'

import {useGlobal} from '~/app/(base)/global-provider'
import {BackLink} from '~/components/arrow-link'

export function BackToWiki() {
  const {paths} = useGlobal()

  if (!paths?.wiki) return null

  return <BackLink href={paths.wiki}>All wiki</BackLink>
}
