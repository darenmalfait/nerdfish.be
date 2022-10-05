import { useLoaderData } from '@remix-run/react'
import * as React from 'react'

import type { LoaderType } from './generic-page.server'

import { FourOhFour, PageBuilder } from '~/components/common'
import { Preview } from '~/components/utils/preview'
import { pageMeta } from '~/lib/utils/seo'

export const meta = pageMeta

export function CatchBoundary() {
  return <FourOhFour />
}

export default function GenericPage() {
  const {
    data: initialData,
    preview,
    query,
    params,
  } = useLoaderData<LoaderType>()
  const [data, setData] = React.useState(initialData)

  React.useEffect(() => {
    setData(initialData)
    // on page change we need to update the data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData.slug, initialData.lang])

  const { body } = data

  return (
    <>
      {preview && (
        <Preview data={data} setData={setData} query={query} params={params} />
      )}
      <main>{body && <PageBuilder items={body} />}</main>
    </>
  )
}
