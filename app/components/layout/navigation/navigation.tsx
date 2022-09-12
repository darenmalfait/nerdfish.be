import * as React from 'react'

import { useTranslation } from 'react-i18next'

import { Navbar } from './navbar'

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
  const { i18n } = useTranslation()

  const actionItems = React.useMemo(() => {
    return actions.items?.map((cta: SanityCta, i: number) => {
      return <Navbar.Link {...cta} key={i} />
    })
  }, [actions])

  return (
    <Navbar
      {...props}
      rootPath={localizeSlug('/', i18n.language)}
      actions={actionItems}
    >
      {main.items?.map((cta: SanityCta, i: number) => {
        return (
          <Navbar.Link
            className="block relative py-2 px-3 transition leading-0"
            {...cta}
            key={i}
          />
        )
      })}
    </Navbar>
  )
}

export { Navigation }
