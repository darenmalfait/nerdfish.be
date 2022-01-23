export type LanguageCode = 'en' | 'nl'

export interface Language {
  code: LanguageCode
  isDefault?: boolean
  name?: string
}

export enum PageType {
  page = 'page',
  blog = 'post',
}
