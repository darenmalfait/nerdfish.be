import {
  PublishAction,
  DiscardChangesAction,
} from 'part:@sanity/base/document-actions'
import i18n from 'sanity-plugin-intl-input/lib/actions/index'

const singletons = ['siteSettings', 'companyInfo', 'socials', 'cookieConsent']

export default function resolveDocumentActions(
  props: any,
): Record<string, unknown>[] {
  const i18nActions = [...i18n(props)]

  const isSingle = singletons.indexOf(props.type) > -1

  if (isSingle) {
    return [PublishAction, DiscardChangesAction]
  }

  return i18nActions
}
