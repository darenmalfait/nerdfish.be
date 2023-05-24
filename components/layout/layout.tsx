import React from 'react'
import {cx} from '@nerdfish/utils'

import {GlobalProvider} from '~/context/global-provider'
import {type Global} from '~/tina/__generated__/types'

import {Footer} from './footer'
import {Navigation} from './navigation/navigation'

export const Layout = ({
  globalData,
  children,
  navigationClassName,
  forceTheme,
}: {
  globalData?: Partial<Global> | any
  children: React.ReactNode
  navigationClassName?: string
  forceTheme?: 'light' | 'dark'
}) => {
  return (
    <GlobalProvider {...globalData}>
      <div className={cx(forceTheme)}>
        <div className="bg-primary">
          <Navigation
            hideThemeToggle={!!forceTheme}
            className={navigationClassName}
          />

          {children}

          <Footer hideThemeToggle={!!forceTheme} />
        </div>
      </div>
    </GlobalProvider>
  )
}
