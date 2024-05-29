'use client'

import * as React from 'react'

import {BackLink} from '~/app/common'
import {useGlobal} from '~/app/global-provider'

export function BackToWiki() {
  const {paths} = useGlobal()

  if (!paths?.wiki) return null

  return <BackLink href={paths.wiki}>All wiki</BackLink>
}
