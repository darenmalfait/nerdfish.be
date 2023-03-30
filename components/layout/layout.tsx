'use client'

import React from 'react'

import {GlobalProvider} from '~/context/global-provider'
import {type Global} from '~/tina/__generated__/types'

import {Footer} from './footer'
import {Navigation} from './navigation/navigation'

export const Layout = ({
  globalData,
  children,
}: {
  globalData?: Partial<Global> | any
  children: React.ReactNode
}) => {
  return (
    <GlobalProvider {...globalData}>
      <Navigation />

      {children}

      <Footer />
    </GlobalProvider>
  )
}
