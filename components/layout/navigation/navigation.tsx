import * as React from 'react'

import { Navbar } from './navbar'

import { useGlobal } from '../../../context/global-provider'

interface NavigationProps {
  multilang?: boolean
}

function Navigation({ multilang, ...props }: NavigationProps) {
  const { navigation } = useGlobal()

  const actionItems = React.useMemo(() => {
    return navigation?.actions?.map((link, i: number) => {
      if (!link) return null

      return (
        <Navbar.Link key={i} isButton={link.isButton || false} href={link.href}>
          {link.label}
        </Navbar.Link>
      )
    })
  }, [navigation?.actions])

  return (
    <Navbar {...props} rootPath="/" actions={actionItems}>
      {navigation?.main?.map((link, i: number) => {
        if (!link) return null

        return (
          <Navbar.Link
            key={i}
            className="leading-0 block relative py-2 px-3 transition"
            isButton={link.isButton || false}
            href={link.href}
          >
            {link.label}
          </Navbar.Link>
        )
      })}
    </Navbar>
  )
}

export { Navigation }
