import { Schema } from 'tinacms'

import * as collections from './collections'

const schema: Schema = {
  collections: Object.keys(collections).map(key => collections[key]),
}

export { schema }
