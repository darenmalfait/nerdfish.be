import S from '@sanity/desk-tool/structure-builder'
import { IoMdShare } from 'react-icons/io'

export default S.listItem()
  .title('Socials')
  .child(S.document().id('socials').schemaType('socials').documentId('socials'))
  .icon(IoMdShare)
