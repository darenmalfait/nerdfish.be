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
  },
  _type == "button" => {
    ...,
    link{
      ...,
      reference->{
        "lang": i18n_lang,
        "slug": slug.current,
        publishedAt,
      }
    },
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
