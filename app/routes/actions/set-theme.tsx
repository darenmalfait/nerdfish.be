import { ActionArgs, json, redirect } from '@remix-run/node'
import * as React from 'react'

import { isTheme } from '~/context/theme-provider'
import { getThemeSession } from '~/lib/services/theme.server'

export async function action({ request }: ActionArgs) {
  const themeSession = await getThemeSession(request)
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const theme = form.get('theme')

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    })
  }

  themeSession.setTheme(theme)
  return json(
    { success: true },
    { headers: { 'Set-Cookie': await themeSession.commit() } },
  )
}

export async function loader() {
  return redirect('/', { status: 404 })
}

export default function SetThemeRoute() {
  return <div>Oops... You should not see this.</div>
}
