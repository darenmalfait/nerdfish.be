import { groq } from '~/lib/sanity'

export const imageMeta = groq`
  alt,
  asset->,
  crop,
  customRatio,
  hotspot
`

export const portableText: any = groq`
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      ...,
      page->{"type": _type, "slug": slug.current, "lang": i18n_lang}
    }
  },
  _type == "cta" => {
    _type,
    title,
    kind,
    link,
    internalPage->{
      "slug": slug.current
    }
  },
  _type == "reference" => @->
`

export const background = groq`
  background {
    ...,
    backgroundType,
    static {
      color,
      imageColor {
        ${imageMeta}
      }
    },
    imageBackground {
      image {
        ${imageMeta}
      }
    }
  }
`
