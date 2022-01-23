import { LogoutIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import * as React from 'react'
import { useLocation } from 'react-router-dom'

import { usePreviewSubscription } from '~/lib/sanity/use-preview-subscription'

function Preview({
  data,
  setData,
  query,
  params,
}: {
  data: any
  setData: any
  query: any
  params: any
}) {
  const { pathname } = useLocation()

  const { data: previewData } = usePreviewSubscription(query, {
    params,
    initialData: data,
    enabled: true,
  })

  useEffect(() => setData(previewData), [previewData, setData])

  return (
    <div className="flex fixed inset-0 z-50 justify-end items-end p-6 pointer-events-none md:justify-start">
      <div className="flex gap-x-2 items-center p-1 font-bold text-white bg-pink-500 rounded shadow-lg">
        <span className="inline-block p-2">Preview Mode</span>
        <a
          href={pathname}
          className="flex gap-x-1 items-center p-2 px-3 hover:bg-pink-600 rounded pointer-events-auto"
        >
          <LogoutIcon className="w-4 h-auto" /> Exit
        </a>
      </div>
    </div>
  )
}

export { Preview }
