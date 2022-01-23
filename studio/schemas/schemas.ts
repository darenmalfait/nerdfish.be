import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'

import * as documents from './documents'
import * as i18n from './i18n'
import * as modules from './modules'
import * as objects from './objects'
import * as blocks from './page-blocks'

import { mapObjectToSchema } from '../utils/map-to-props'

const allI18n = Object.values(i18n)

export default createSchema({
  name: 'default',
  types: schemaTypes
    .concat(mapObjectToSchema(allI18n))
    .concat(mapObjectToSchema(blocks))
    .concat(mapObjectToSchema(documents))
    .concat(mapObjectToSchema(modules))
    .concat(mapObjectToSchema(objects)),
})
