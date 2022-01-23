interface ParsedUrlQuery extends NodeJS.Dict<string | string[]> {}

export type SanityProps<T = any, Q extends ParsedUrlQuery = ParsedUrlQuery> = {
  data: T
  preview: boolean
  params: Q
}

import type { CodeBlockLanguage } from '@daren/ui-components'
import type { PortableTextEntry } from '@sanity/block-content-to-react'

import type { LanguageCode } from '.'

import type { CtaProps } from '~/components/buttons'

export interface SanityImagePaletteSwatch {
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export interface SanityImagePalette {
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export interface SanityImageDimensions {
  height?: number
  width?: number
  aspectRatio?: number
}

export interface SanityGeopoint {
  lat?: number
  lng?: number
  alt?: number
}

export interface SanityImageMetadata {
  location?: SanityGeopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export interface SanityImageSourceData {
  name?: string
  id?: string
  url?: string
}

export interface SanityCode {
  language: CodeBlockLanguage
  code: string
}

export interface SanityFile extends SanityDocument {
  asset?: {
    url?: string
  }
}

export interface SanityImageAsset extends SanityDocument {
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityImageSourceData
}

export interface SanityImageCrop {
  top: number
  bottom: number
  left: number
  right: number
}

export type SanityImageSizes = 'small' | 'default' | 'medium' | 'full'

export interface SanityImage {
  asset?: SanityImageAsset
  hotspot?: {
    x?: number
    y?: number
    height?: number
    width?: number
  }
  alt?: string
  crop?: SanityImageCrop
  size?: SanityImageSizes
  shadow?: boolean
  zoom?: boolean
}

export interface SanityTable {
  _key?: string
  rows?: {
    _key?: string
    cells?: string[]
  }[]
}

export interface SanityTag {
  value?: string
  label?: string
}

export interface SanityCta {
  title?: string
  internalPage?: SanityPage
  link?: string
  kind?: CtaProps['layout']
  lang?: LanguageCode
}

export interface SanitySeo {
  title?: string
  description?: string
  canonical?: string
  image?: SanityImage
}

export interface SanityDocument {
  _id?: string
  _type?: string
  _createdAt?: Date
  _updatedAt?: Date
  _rev?: string
}

export interface SanityI18NRefsObject {
  lang?: string
  ref?: SanityPage
}

export interface SanityPage extends SanityDocument {
  title?: string
  slug?: string
  body?: any
  seo?: SanitySeo
  lang?: LanguageCode
  refs?: SanityI18NRefsObject[]
}

export interface SanityAuthor extends SanityDocument {
  name?: string
  image?: SanityImage
  bio?: any
}

export interface SanityPost extends SanityDocument {
  title?: string
  slug?: string
  body?: any
  category: 'technical' | 'snippet' | 'coaching' | 'project' | 'blog' | string
  publishedAt: string
  excerpt?: string
  tags?: SanityTag[]
  author?: SanityAuthor
  image?: SanityImage
  lang?: string
  refs?: SanityI18NRefsObject[]
  readingTime?: number
  seo?: SanitySeo
}

export interface Translated<T> {
  [lang: string]: T
}

export interface CookieConsent {
  enabled?: boolean
  message?: PortableTextEntry[]
  tracking?: {
    enabled?: boolean
    message?: Translated<{ value: string }>
  }
  advertisement?: {
    enabled?: boolean
    message?: Translated<{ value: string }>
  }
}

export interface CompanyInfo {
  name?: string
  email?: string
  phone?: string
  address?: string
}

export interface SiteInfo {
  site?: SiteConfig
  info?: CompanyInfo
  navigation?: SiteNavigation
  socials?: SanitySocial[]
}

export interface SiteConfig {
  multilang?: boolean
  seo?: SanitySeo
  cookieConsent?: CookieConsent
}

export interface I18n {
  translations?: any
}

export interface Navigation {
  items?: SanityCta[]
}

export interface SiteNavigation {
  main?: Navigation
  actions?: Navigation
  footer?: Navigation
}

export interface SanitySocial {
  name: string
  link: string
}

export interface SanityColorList {
  title: string
  value: string
}

export interface SanityImageBackground {
  image?: SanityImage
}

export interface SanityBackground {
  backgroundType?: string
  static?: {
    color?: SanityColorList
    imageColor?: SanityImage
  }
  imageBackground?: SanityImageBackground
}

export interface SanityBlockLayout {
  background?: SanityBackground
}

export interface SanityBlock<
  T = Record<string, unknown>,
  X = Record<string, unknown>,
> {
  content?: T
  layout?: X | SanityBlockLayout
}

export interface SanityColor {
  _type?: string
  hex: string
  alpha: number
  hsl: {
    _type?: string
    h: number
    s: number
    l: number
    a: number
  }
  hsv: {
    _type?: string
    h: number
    s: number
    v: number
    a: number
  }
  rgb: {
    _type?: string
    r: number
    g: number
    b: number
    a: number
  }
}
