import {formatDate} from 'date-fns'

function getDatedSlug(date: string, slug: string) {
  if (!date) return slug

  const dateSegment = formatDate(new Date(date), 'yyyy/MM')
  return `/${dateSegment}/${slug || ''}/`
}

export {getDatedSlug}
