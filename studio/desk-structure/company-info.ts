import S from '@sanity/desk-tool/structure-builder'
import { MdBusiness } from 'react-icons/md'

export default S.listItem()
  .title('Company Info')
  .child(S.document().schemaType('companyInfo').documentId('companyInfo'))
  .icon(MdBusiness)
