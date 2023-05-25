'use client'

import * as React from 'react'
import Head from 'next/head'

import {
  Page,
  type Blog,
  type Product,
  type Wiki,
} from '~/tina/__generated__/types'

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

interface BlockDataContextProps {
  wikis: Partial<Wiki>[]
  blogs: Partial<Blog>[]
  products: Partial<Product>[]
  page?: BlockDataProviderProps['page']
  blog?: BlockDataProviderProps['blog']
  wiki?: BlockDataProviderProps['wiki']
}

const BlockDataContext = React.createContext<BlockDataContextProps | null>(null)
BlockDataContext.displayName = 'BlockDataContext'

interface BlockDataProviderProps {
  wikis?: Partial<Wiki>[]
  blogs?: Partial<Blog>[]
  products?: Partial<Product>[]
  children: React.ReactNode
  page?: Partial<Page>
  blog?: Partial<Blog>
  wiki?: Partial<Wiki>
}

// import { BlockDataProvider } from "path-to-context/BlockDataContext"
// use <BlockDataProvider> as a wrapper around the part you need the context for
function BlockDataProvider({
  wikis = [],
  blogs = [],
  products = [],
  children,
  ...data
}: BlockDataProviderProps) {
  return (
    <BlockDataContext.Provider value={{wikis, blogs, products, ...data}}>
      <Head>
        <script dangerouslySetInnerHTML={{__html: modeScript}} />
      </Head>
      {children}
    </BlockDataContext.Provider>
  )
}

// import { useBlockData } fron "path-to-context/BlockDataContext"
// within functional component
// const { sessionToken, ...BlockDataContext } = useBlockData()
function useBlockData(): BlockDataContextProps {
  const context = React.useContext(BlockDataContext)

  if (!context) {
    throw new Error('You should use useBlockData within an BlockDataContext')
  }

  return context
}

export {BlockDataProvider, useBlockData}
