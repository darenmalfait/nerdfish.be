import { createInstance } from 'i18next'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { HandleDataRequestFunction, RemixServer } from 'remix'
import type { EntryContext } from 'remix'

import { i18nextOptions } from '~/i18n.config'

export const handleDataRequest: HandleDataRequestFunction = async (
  response: Response,
  { request },
) => {
  const isGet = request.method.toLowerCase() === 'get'
  const purpose =
    request.headers.get('Purpose') ||
    request.headers.get('X-Purpose') ||
    request.headers.get('Sec-Purpose') ||
    request.headers.get('Sec-Fetch-Purpose') ||
    request.headers.get('Moz-Purpose')
  const isPrefetch = purpose === 'prefetch'

  // If it's a GET request and it's a prefetch request and it doesn't have a Cache-Control header
  if (isGet && isPrefetch && !response.headers.has('Cache-Control')) {
    // we will cache for 10 seconds only on the browser
    response.headers.set('Cache-Control', 'private, max-age=10')
  }

  return response
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const i18n = createInstance()
  await i18n.use(initReactI18next).init(i18nextOptions)

  const markup = renderToString(
    <I18nextProvider i18n={i18n}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>,
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
