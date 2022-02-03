import S from '@sanity/desk-tool/structure-builder'
import { BsFillPersonFill } from 'react-icons/bs'

export default S.listItem()
  .title('Authors')
  .schemaType('author')
  .child(
    S.documentList()
      .title('Authors')
      .schemaType('author')
      .filter('_type == $type')
      .params({
        type: 'author',
      }),
  )
  .icon(BsFillPersonFill)
