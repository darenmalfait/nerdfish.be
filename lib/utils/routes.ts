import formatDate from 'date-fns/format'

import { stripPreSlash } from './string'

function getBasePath(path?: string) {
  return path ? path.substring(0, path.lastIndexOf('.')) : path
}

function getRoute(slug: string, basePath: string = ''): string {
  if (slug === 'home') {
    slug = ''
  }

  return `/${basePath ? `${basePath}/` : ''}${stripPreSlash(slug)}`
}

function getDatedSlug(date: string, slug: string) {
  if (!date) return slug

  const dateSegment = formatDate(new Date(date), 'yyyy/MM')
  return `/${dateSegment}/${slug || ''}`
}

export { getRoute, getDatedSlug, getBasePath }
