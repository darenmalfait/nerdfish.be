import S from '@sanity/desk-tool/structure-builder'
import { GoSettings } from 'react-icons/go'

export default S.listItem()
  .title('Site Settings')
  .child(S.document().schemaType('siteSettings').documentId('siteSettings'))
  .icon(GoSettings)
