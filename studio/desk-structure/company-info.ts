import S from '@sanity/desk-tool/structure-builder'
import { MdBusiness } from 'react-icons/md'

export default S.listItem()
  .title('Company Info')
  .child(
    S.document()
      .id('companyInfo')
      .schemaType('companyInfo')
      .documentId('companyInfo'),
  )
  .icon(MdBusiness)
