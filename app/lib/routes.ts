import formatDate from 'date-fns/format'

import { getDefaultLanguage } from '~/lib/utils/i18n'
import { stripPreSlash } from '~/lib/utils/string'
import { PageType } from '~/types/languages'

export function getDynamicRoute(type: string = PageType.page): string | false {
  if (type === PageType.blog) return 'blog'

  return false
}

export function getRoute(
  slug: string,
  type: string = PageType.page,
  lang = getDefaultLanguage().code,
): string {
  if (slug === 'home') {
    slug = ''
  }

  const isDynamic = getDynamicRoute(type)
  return `${
    !(lang === getDefaultLanguage().code && slug === '') ? `/${lang}` : ''
  }/${isDynamic ? `${isDynamic}/` : ''}${stripPreSlash(slug)}`
}

export function getBlogSlug(publishedAt: string, slug: string) {
  const dateSegment = formatDate(new Date(publishedAt), 'yyyy/MM')
  return `/${dateSegment}/${slug || ''}`
}
