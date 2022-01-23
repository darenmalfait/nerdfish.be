import S from '@sanity/desk-tool/structure-builder'
import { BsEye } from 'react-icons/bs'
import DocumentsPane from 'sanity-plugin-documents-pane'
import * as Structure from 'sanity-plugin-intl-input/lib/structure'
import SeoPane from 'sanity-plugin-seo-pane'

import authors from './authors'
import companyInfo from './company-info'
import cookieConsent from './cookie-consent'
import navigation from './navigation'
import pages from './pages'
import posts from './posts'
import siteSettings from './site-settings'
import socials from './socials'
import tags from './tags'

import { JSONPreview, PagePreview } from '../components/previews'
import getPreviewUrl from '../utils/get-preview-url'

// Hide document types that we already have a specific structure definition for
const hiddenDocTypes = (listItem: any) =>
  ![
    'author',
    'companyInfo',
    'cookieConsent',
    'navigation',
    'page',
    'post',
    'siteSettings',
    'socials',
    'tag',
    '__i18n_translations_maintenance_tab',
  ].includes(listItem.getId())

function deskStructure(): any {
  const items = Structure.getFilteredDocumentTypeListItems()

  return S.list()
    .id('__root__')
    .title('Content')
    .items([
      pages,
      posts,
      authors,
      socials,
      tags,
      S.divider(),
      siteSettings,
      cookieConsent,
      companyInfo,
      navigation,
      ...items.filter(hiddenDocTypes),
    ])
}

export default deskStructure

export function getDefaultDocumentNode({ schemaType }: any): any {
  if (schemaType === 'page') {
    return S.document().views([
      ...Structure.getDocumentNodeViewsForSchemaType('page'),
      S.view.component(PagePreview).icon(BsEye).title('Preview'),
      S.view
        .component(SeoPane)
        .options({
          // Retrieve the keywords and synonyms at the given dot-notated strings
          keywords: `seo.keywords`,
          synonyms: `seo.synonyms`,
          url: (doc: any) => getPreviewUrl(doc),
        })
        .title('SEO'),
    ])
  }

  if (schemaType === 'post') {
    return S.document().views([
      ...Structure.getDocumentNodeViewsForSchemaType('post'),
      S.view.component(PagePreview).icon(BsEye).title('Preview'),
      S.view
        .component(SeoPane)
        .options({
          // Retrieve the keywords and synonyms at the given dot-notated strings
          keywords: `seo.keywords`,
          synonyms: `seo.synonyms`,
          url: (doc: any) => getPreviewUrl(doc),
        })
        .title('SEO'),
    ])
  }

  if (schemaType === 'tag') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id)]`,
          params: { id: `_id` },
          useDraft: false,
          debug: true,
        })
        .title('Documents'),
    ])
  }

  if (schemaType === 'navigation') {
    return S.document().views([
      ...Structure.getDocumentNodeViewsForSchemaType('navigation'),
    ])
  }

  return S.document().views([
    S.view.form(),
    S.view.component(JSONPreview).title('JSON'),
  ])
}
