import * as React from 'react'
import type { ReactNode } from 'react'

function ClientOnly({ children }: { children: ReactNode }): JSX.Element | null {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return mounted ? <>{children}</> : null
}

export { ClientOnly }
