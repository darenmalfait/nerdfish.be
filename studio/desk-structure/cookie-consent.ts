import S from '@sanity/desk-tool/structure-builder'
import { BiCookie } from 'react-icons/bi'

export default S.listItem()
  .title('Cookie Consent')
  .child(S.document().schemaType('cookieConsent').documentId('cookieConsent'))
  .icon(BiCookie)
