import formatDate from 'date-fns/format'

const baseUrl: string = process.env.SANITY_STUDIO_PROJECT_URL || ''

const previewable = ['page', 'post']

export default function getPreviewUrl(doc: any): string | undefined {
  if (previewable.includes(doc._type)) {
    const slug = doc?.slug?.current

    if (!slug) {
      return ''
    }

    const { i18n_lang: lang, _type: type } = doc

    const url = new URL(baseUrl)
    url.pathname = slug === 'home' ? `/${lang}` : `/${lang}/${slug}`

    if (doc._type === 'post') {
      const dateSegment = formatDate(new Date(doc.publishedAt), 'yyyy/MM')
      url.pathname = `/${lang}/${
        doc.category === 'wiki' ? 'wiki' : 'blog'
      }/${dateSegment}/${slug || ''}/`
    }

    url.searchParams.set(
      `preview`,
      process.env.SANITY_STUDIO_PREVIEW_SECRET as string,
    )
    url.searchParams.set(`lang`, lang)
    url.searchParams.set(`type`, type)

    return url.toString()
  }

  return undefined
}
