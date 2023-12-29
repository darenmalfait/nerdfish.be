'use client'

import {useGlobal} from '~/app/(base)/global-provider'
import {BackLink} from '~/components/common/arrow-link'

export function BackToBlog() {
  const {paths} = useGlobal()

  if (!paths?.blog) return null

  return <BackLink href={paths.blog}>All blog articles</BackLink>
}
