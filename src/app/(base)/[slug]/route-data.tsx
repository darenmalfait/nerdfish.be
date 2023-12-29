import * as React from 'react'
import {notFound} from 'next/navigation'

import {getPage} from '~/lib/api/cms'
import {stripTrailingSlash} from '~/lib/utils/string'

// slug is empty string when on the homepage
export const getRouteData = React.cache(async function getRouteData(
  slugProp?: string,
) {
  const slug = decodeURIComponent(slugProp ?? '')

  const filename =
    !slug || slug === '/' ? 'home' : stripTrailingSlash(slug.toLowerCase())

  const result = await getPage(`${filename.length ? filename : 'home'}.mdx`)

  if (!result) return notFound()

  return result
})
