import { background, imageMeta, portableText } from './utils'

import { groq } from '../sanity'

export const referenceBlock = groq`
  _type,
  content {
    ...,
    image {
      ${imageMeta}
    },
    element->{
      "slug": slug.current,
      "lang": i18n_lang
    }
  },
  layout {
    backgroundColor
  }
`

export const heroBlock = groq`
  _type == 'heroBlock' => {
    _type,
    content {
      ...,
      text[] {
        ${portableText}
      }
    }
  }
`

export const referencesBlock = groq`
  _type == 'referencesBlock' => {
    content {
      cards[] {
        ${referenceBlock}
      }
    }
  }
`

export const longcopyBlock = groq`
  _type == 'longcopyBlock' => {
    _type,
    content {
      content[] {
        ${portableText}
      }
    },
  }
`

export const postsBlock = groq`
  _type == 'postsBlock' => {
    _type,
    content {
      ...,
      link->{ "slug": slug.current, "lang": i18n_lang },
      "posts": *[_type == "post" && i18n_lang == $lang && !(_id in path("drafts.**"))]  | order(dateTime(publishedAt) desc) {
        ...,
        "slug": slug.current,
        "lang": i18n_lang,
        excerpt,
        author->,
        tags[]->,
        "readingTime": round(length(pt::text(body)) / 5 / 180 )
      }
    }
  }
`

export const aboutBlock: any = groq`
  _type == 'aboutBlock' => {
    _type,
    content {
      ...,
      body[] {
        ${portableText}
      },
      action {
        title,
        kind,
        internalPage->{
          _id,
          "slug": slug.current,
          "lang": i18n_lang
        },
        link
      },
    }
  }
`

export const carouselBlock: any = groq`
  _type == 'carouselBlock' => {
    _type,
    content {
      items[] {
        ...,
        body[] {
          ${portableText}
        },
        action {
          title,
          kind,
          internalPage->{
            _id,
            "slug": slug.current,
            "lang": i18n_lang
          },
          link
        },
      }
    }
  }
`

export const blocks = groq`
  ...,
  ${heroBlock},
  ${longcopyBlock},
  ${referencesBlock},
  ${postsBlock},
  ${aboutBlock},
  ${carouselBlock},
  layout {
    ${background}
  }
`
