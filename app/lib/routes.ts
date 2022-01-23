import formatDate from 'date-fns/format'

import { PageType } from '~/types/languages'
import { getDefaultLanguage } from '~/utils/i18n'
import { stripPreSlash } from '~/utils/string'

export function getDynamicRoute(type: string = PageType.page): string | false {
  switch (type) {
    case PageType.blog:
      return 'blog'
    default:
      return false
  }
}

export function getRoute(
  type: string = PageType.page,
  slug: string,
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
  return `/${dateSegment}/${slug || ''}/`
}
