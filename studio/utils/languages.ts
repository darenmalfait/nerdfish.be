import languages from '../../config/languages'

interface LangProps {
  code?: string
  isDefault?: boolean
  name?: string
}

export function defaultLanguage(): LangProps | undefined {
  return (languages as LangProps[]).find(({ isDefault }) => isDefault)
}

export function isDefaultLanguage(lang: string): boolean {
  return defaultLanguage()?.code === lang
}
