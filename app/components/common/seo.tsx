import {generateSocialImage} from '~/lib/utils/social'
import {stripPreSlash} from '~/lib/utils/string'

type SocialMetas = {
  image?: string | null
  url: string
  title: string
  description: string
  subImage?: string | null
  cardType?: 'primary' | 'secondary' | string | null
  basePath: string
}

export function getSocialMetas({
  url,
  title,
  description,
  image,
  keywords = '',
}: {
  image?: string | null
  url: string
  title: string
  description: string
  keywords?: string
}) {
  // TODO add default seo meta image
  const imageMeta = image
    ? {
        image,
        'og:image': image,
        'twitter:image': image,
      }
    : null

  return {
    title,
    description,
    keywords,
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'twitter:card': image ? 'summary_large_image' : 'summary',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:alt': title,
    ...imageMeta,
  }
}

function getMetaTags({
  url,
  image: ogImage,
  title,
  subImage,
  description,
  cardType = 'primary',
  basePath,
}: SocialMetas) {
  let metaImage = ogImage

  if (!ogImage) {
    const variant = cardType ?? 'primary'

    metaImage = generateSocialImage({
      title: variant === 'primary' ? title : '',
      imagePublicID:
        variant === 'primary' ? 'social.png' : 'social-transparent.png',
      image: subImage,
      variant,
    })
  }

  const image = metaImage?.startsWith('http')
    ? metaImage
    : `${basePath}/${stripPreSlash(metaImage ?? '')}`

  return getSocialMetas({url, title, description, image})
}

function noIndex() {
  return {
    robots: 'noindex, nofollow',
  }
}

export {getMetaTags, noIndex}
