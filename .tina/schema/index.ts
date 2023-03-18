import {type Schema} from 'tinacms'

import * as collections from './collections'

const schema: Schema = {
  // eslint-disable-next-line import/namespace
  collections: Object.keys(collections).map(key => (collections as any)[key]),
}

export {schema}
