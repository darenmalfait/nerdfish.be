import S from '@sanity/desk-tool/structure-builder'
import { AiFillTags } from 'react-icons/ai'

export default S.listItem()
  .title('Tags')
  .schemaType('tag')
  .child(
    S.documentList()
      .title('Tags')
      .schemaType('tag')
      .filter('_type == $type')
      .params({
        type: 'tag',
      }),
  )
  .icon(AiFillTags)
