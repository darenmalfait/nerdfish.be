import S from '@sanity/desk-tool/structure-builder'
import { CgMenuHotdog } from 'react-icons/cg'

import { defaultLanguage } from '../utils/languages'

export default S.listItem()
  .title('Menus')
  .schemaType('navigation')
  .child(
    S.documentList()
      .title('Menus')
      .schemaType('navigation')
      .filter('i18n_lang == $lang && _type == $type')
      // .filter('_type == $type')
      .params({
        lang: defaultLanguage()?.code,
        type: 'navigation',
      }),
  )
  .icon(CgMenuHotdog)
