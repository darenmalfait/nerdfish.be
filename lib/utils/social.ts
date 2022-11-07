function generateSocialImage({
  title,
  cloudName = 'darenmalfait',
  imagePublicID,
  cloudinaryUrlBase = 'https://res.cloudinary.com',
  version = null,
  titleFont = 'arial',
  titleExtraConfig = '_bold',
  imageWidth = 1200,
  imageHeight = 630,
  textAreaWidth = 630,
  textAreaHeight = 450,
  textLeftOffset = 45,
  textBottomOffset = -40,
  textColor = 'FFFFFF',
  titleFontSize = 60,
}: {
  title: string
  cloudName?: string
  imagePublicID: string
  cloudinaryUrlBase?: string
  version?: string | null
  titleFont?: string
  titleExtraConfig?: string
  imageWidth?: number
  imageHeight?: number
  textAreaWidth?: number
  textAreaHeight?: number
  textLeftOffset?: number
  textBottomOffset?: number
  textColor?: string
  titleFontSize?: number
}) {
  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${imageWidth}`,
    `h_${imageHeight}`,
    'c_fill',
    'f_auto',
  ].join(',')

  // configure the title text
  const titleConfig = [
    `w_${textAreaWidth}`,
    `h_${textAreaHeight}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_west',
    `x_${textLeftOffset}`,
    `y_${textBottomOffset}`,
    `l_text:${titleFont}_${titleFontSize}${titleExtraConfig}:${encodeURIComponent(
      title,
    )}`,
  ].join(',')

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    cloudinaryUrlBase,
    cloudName,
    'image',
    'upload',
    imageConfig,
    titleConfig,
    version,
    imagePublicID,
  ]

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean)

  // join all the parts into a valid URL to the generated image
  return validParts.join('/')
}

export { generateSocialImage }
