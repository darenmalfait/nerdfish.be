import { resolve } from 'node:path'

import { createCookie } from '@remix-run/node'
import Backend from 'i18next-fs-backend'
import { RemixI18Next } from 'remix-i18next'

import { i18nextOptions } from '~/i18n.config'
const { fallbackLng: fallbackLanguage, supportedLanguages } = i18nextOptions

const i18n = new RemixI18Next({
  detection: {
    supportedLanguages,
    fallbackLanguage,
    cookie: createCookie('language'),
  },
  i18next: {
    backend: {
      loadPath: resolve('./public/translations/{{lng}}/{{ns}}.json'),
    },
  },
  backend: Backend,
})

function getSupportedLanguages() {
  return supportedLanguages
}

function getFallbackLanguage() {
  return fallbackLanguage
}

export { i18n, getSupportedLanguages, getFallbackLanguage }
