import S from '@sanity/desk-tool/structure-builder'
import { MdDescription } from 'react-icons/md'

import { defaultLanguage } from '../utils/languages'

export default S.listItem()
  .title('Blog posts')
  .schemaType('post')
  .child(
    S.documentList()
      .id('post')
      .title('Blog posts')
      .schemaType('post')
      .filter('i18n_lang == $lang && _type == $type')
      // .filter('_type == $type')
      .params({
        lang: defaultLanguage()?.code,
        type: 'post',
      })
      .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
  )
  .icon(MdDescription)
