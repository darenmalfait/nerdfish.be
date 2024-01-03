import {type SchemaField} from 'tinacms'

const tagsSchema: SchemaField = {
  type: 'string',
  list: true,
  name: 'tags',
  label: 'Tags',
}

export {tagsSchema}
