import { createCookie } from 'remix'
import { RemixI18Next, FileSystemBackend } from 'remix-i18next'

import { i18nextOptions } from '~/i18n.config'
const { fallbackLng, supportedLanguages } = i18nextOptions

const backend = new FileSystemBackend('./public/translations')

const i18next = new RemixI18Next(backend, {
  fallbackLng,
  supportedLanguages,
  cookie: createCookie('language'),
})

function getSupportedLanguages() {
  return supportedLanguages
}

function getFallbackLanguage() {
  return fallbackLng
}

export { i18next, getSupportedLanguages, getFallbackLanguage }
