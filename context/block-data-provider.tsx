import * as React from 'react'

import type {Blog, Product, Wiki} from '.tina/__generated__/types'

interface BlockDataContextProps {
  wiki: Partial<Wiki>[]
  blog: Partial<Blog>[]
  products: Partial<Product>[]
}

const BlockDataContext = React.createContext<BlockDataContextProps | null>(null)
BlockDataContext.displayName = 'BlockDataContext'

interface BlockDataProviderProps {
  wiki?: Partial<Wiki>[]
  blog?: Partial<Blog>[]
  products?: Partial<Product>[]
  children: React.ReactNode
}

// import { BlockDataProvider } from "path-to-context/BlockDataContext"
// use <BlockDataProvider> as a wrapper around the part you need the context for
function BlockDataProvider({
  wiki = [],
  blog = [],
  products = [],
  children,
}: BlockDataProviderProps) {
  return (
    <BlockDataContext.Provider value={{wiki, blog, products}}>
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
