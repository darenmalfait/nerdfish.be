import i18next from 'i18next'
import * as React from 'react'
import { hydrate } from 'react-dom'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { RemixBrowser } from 'remix'

import { i18nextOptions } from '~/i18n.config.js'

i18next
  .use(initReactI18next)
  .init(i18nextOptions)
  .then(() => {
    // then hydrate your app wrapped in the RemixI18NextProvider
    return hydrate(
      <I18nextProvider i18n={i18next}>
        <RemixBrowser />
      </I18nextProvider>,
      document,
    )
  })
