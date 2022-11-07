import Head from 'next/head'
import React from 'react'

import { Footer } from './footer'
import { Navigation } from './navigation/navigation'

import type { Global } from '../../.tina/__generated__/types'
import { GlobalProvider } from '../../context/global-provider'

export const Layout = ({
  globalData,
  children,
}: {
  globalData?: Partial<Global> | any
  children: React.ReactNode
}) => {
  return (
    <>
      <Head>
        <title>{globalData?.seo?.title}</title>
        <meta name="description" content={globalData?.seo?.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalProvider {...globalData}>
        <Navigation />

        {children}

        <Footer />
      </GlobalProvider>
    </>
  )
}
