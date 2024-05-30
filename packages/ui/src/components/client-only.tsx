'use client'

import * as React from 'react'

export interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ClientOnly = (props: ClientOnlyProps): React.ReactNode => {
  const {children, fallback} = props
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return fallback ?? null
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
