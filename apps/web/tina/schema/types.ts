import {type SchemaField} from 'tinacms'

type ObjectField = SchemaField & {
  type: 'object'
  fields: SchemaField[]
}

export type {ObjectField}
