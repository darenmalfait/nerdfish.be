export type LanguageCode = 'en' | 'nl'

export interface Language {
  code: string
  isDefault?: boolean
  name?: string
}

export enum PageType {
  page = 'page',
  blog = 'post',
  wiki = 'wiki',
}
