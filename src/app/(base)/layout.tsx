import * as React from 'react'

import {getGlobalData} from '~/lib/api/cms'

import {BaseLayoutTemplate} from './_components/base-layout'
import {GlobalProvider} from './global-provider'

const getLayoutData = React.cache(function getLayoutData() {
  return getGlobalData()
})

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const layoutData = await getLayoutData()

  return (
    <GlobalProvider {...layoutData}>
      <BaseLayoutTemplate>
        <React.Suspense>{children}</React.Suspense>
      </BaseLayoutTemplate>
    </GlobalProvider>
  )
}
