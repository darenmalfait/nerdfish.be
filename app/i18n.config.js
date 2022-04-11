import languages from '../config/languages'

export const i18nextOptions = {
  fallbackLng: languages.find(({ isDefault }) => !!isDefault)?.code || 'en',
  supportedLanguages: languages.map(({ code }) => code),
  defaultNS: 'common',
  // recommended by the author of remix-i18next
  react: { useSuspense: false },
}
