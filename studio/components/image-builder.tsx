import imageUrlBuilder from '@sanity/image-url'
import client from 'part:@sanity/base/client'

const imageBuilder = imageUrlBuilder(client)

export default imageBuilder
