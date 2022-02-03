import S from '@sanity/desk-tool/structure-builder'
import { MdPages } from 'react-icons/md'

import { defaultLanguage } from '../utils/languages'

export default S.listItem()
  .title('Pages')
  .schemaType('page')
  .child(
    S.documentList()
      .title('Pages')
      .schemaType('page')
      .filter('i18n_lang == $lang && _type == $type')
      // .filter('_type == $type')
      .params({
        lang: defaultLanguage()?.code,
        type: 'page',
      }),
  )
  .icon(MdPages)
