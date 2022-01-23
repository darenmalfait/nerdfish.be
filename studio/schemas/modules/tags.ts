import AutocompleteTagsComponent from '../../components/autocomplete-tags-component'
import type { ArrayField } from '../../types/schema-types'

export const tags: ArrayField = {
  name: 'tags',
  title: 'Tags',
  type: 'array',
  description: 'Add your tags.',
  inputComponent: AutocompleteTagsComponent,
  of: [
    {
      type: 'reference',
      to: [{ type: 'tag' }],
    },
  ],
  options: {
    layout: 'tags',
  },
}
