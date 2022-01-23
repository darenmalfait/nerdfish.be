import blockType from '../../schemas/fragments/block-type'
import { BlockContentType } from '../../types/block-types'
import type { Field, ObjectField } from '../../types/schema-types'

interface CreateBlockSchemaProps {
  name: string
  title: string
  hasContent?: boolean
  hasLayout?: boolean
  fields?: Field[]
  fieldsets?: { name: string; title: string }[]
}

export function createBlockSchema({
  name,
  title,
  hasContent,
  hasLayout,
  fields = [],
  fieldsets = [],
}: CreateBlockSchemaProps): ObjectField {
  return {
    type: 'object',
    name,
    title,
    description: 'Content can be whatever you want.',
    fieldsets: [...fieldsets],
    fields: [
      ...(hasContent ? [blockType(BlockContentType.content, name)] : []),
      ...(hasLayout ? [blockType(BlockContentType.layout, name, true)] : []),
      ...fields,
    ],
    preview: {
      select: {
        title: 'content.title',
      },
      prepare({ title: previewTitle }) {
        return {
          title: previewTitle || `untitled ${title}`,
          subtitle: title,
        }
      },
    },
  }
}
