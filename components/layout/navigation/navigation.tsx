import * as React from 'react'
import {useRouter} from 'next/router'
import clsx from 'clsx'
import {stripPreSlash} from 'lib/utils/string'

import {useGlobal} from '../../../context/global-provider'
import {Navbar} from './navbar'

interface NavigationProps {
  multilang?: boolean
}

function Navigation({multilang, ...props}: NavigationProps) {
  const {navigation} = useGlobal()
  const router = useRouter()

  const actionItems = React.useMemo(() => {
    return navigation?.actions?.map((link, i: number) => {
      if (!link) return null

      return (
        <Navbar.Link key={i} isButton={link.isButton ?? false} href={link.href}>
          {link.label}
        </Navbar.Link>
      )
    })
  }, [navigation?.actions])

  return (
    <Navbar {...props} rootPath="/" actions={actionItems}>
      {navigation?.main?.map((link, i: number) => {
        if (!link) return null
        const isActive = stripPreSlash(router.asPath).startsWith(link.href)

        return (
          <Navbar.Link
            key={i}
            className={clsx(
              'flex h-8 items-center gap-x-1.5 rounded-full px-3 text-black/80 transition hover:bg-gray-50 hover:text-black/90 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white/90 sm:h-10 sm:px-4',
              {
                'flex h-8 items-center gap-x-1.5 rounded-full bg-gray-50 px-3 text-black/80 !text-black transition shadow-outline hover:bg-gray-50 hover:text-black/90 hover:!bg-secondary  dark:bg-black/50 dark:text-white/70 dark:!text-white   dark:hover:text-white/90 sm:h-10 sm:px-4':
                  isActive,
              },
            )}
            isButton={link.isButton ?? false}
            href={link.href}
          >
            {link.label}
          </Navbar.Link>
        )
      })}
    </Navbar>
  )
}

export {Navigation}
