import type { TFunction } from 'i18next'
import { createCookie, redirect } from 'remix'
import type { ActionFunction, LoaderFunction } from 'remix'

import { i18next } from '~/lib/services/i18n.server'
import { handleFormSubmission } from '~/lib/utils/actions.server'
import { validateLanguage } from '~/lib/utils/i18n'

function getErrorForLanguage(
  language: string | null,
  t: TFunction,
): string | null {
  if (!language) return t('common:language.errors.language.required')
  if (!validateLanguage(language))
    return t('common:language.errors.language.invalid')

  return null
}

type ActionData = {
  status: 'success' | 'error'
  fields: {
    lang?: string | null
  }
  errors: {
    generalError?: string | null
    lang?: string | null
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = new URLSearchParams(await request.text())
  const translate = await i18next.getFixedT(request, 'common')

  return handleFormSubmission<ActionData>({
    form,
    translate,
    validators: {
      lang: getErrorForLanguage,
    },
    handleFormValues: async ({ lang }) => {
      const redirectTo = `/${lang}/`

      return redirect(redirectTo, {
        headers: {
          'Set-Cookie': await createCookie('language').serialize(lang),
        },
      })
    },
  })
}

export const loader: LoaderFunction = () => {
  return redirect('/')
}
