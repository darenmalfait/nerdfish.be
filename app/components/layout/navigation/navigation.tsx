import * as React from 'react'

import { Navbar } from './navbar'

import { useTranslations } from '~/context/translations-provider'
import { localizeSlug } from '~/lib/utils/i18n'
import type { SanityCta, SiteNavigation } from '~/types/sanity'

interface NavigationProps {
  multilang?: boolean
  items: SiteNavigation
}

function Navigation({
  multilang,
  items: { main = {}, actions = {} },
  ...props
}: NavigationProps) {
  const { currentLanguage } = useTranslations()

  const actionItems = React.useMemo(() => {
    return (
      actions &&
      actions.items?.map((cta: SanityCta, i: number) => {
        return <Navbar.Link {...cta} key={i} />
      })
    )
  }, [actions])

  return (
    <Navbar
      {...props}
      rootPath={localizeSlug('/', currentLanguage)}
      actions={actionItems}
    >
      {main &&
        main.items?.map((cta: SanityCta, i: number) => {
          return <Navbar.Link {...cta} key={i} />
        })}
    </Navbar>
  )
}

export { Navigation }
