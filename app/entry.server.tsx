import { resolve } from 'node:path'

import type { EntryContext, HandleDataRequestFunction } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { createInstance } from 'i18next'
import Backend from 'i18next-fs-backend'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import { i18n } from './lib/services/i18n.server'
import { routes as otherRoutes } from './other-routes.server'

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
  statusCode: number,
  headers: Headers,
  context: EntryContext,
) {
  for (const handler of otherRoutes) {
    // eslint-disable-next-line no-await-in-loop
    const otherRouteResponse = await handler(request, context)
    if (otherRouteResponse) return otherRouteResponse
  }

  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state
  const instance = createInstance()

  // Then we could detect locale from the request
  const lng = await i18n.getLocale(request)
  // And here we detect what namespaces the routes about to render want to use
  const ns = i18n.getRouteNamespaces(context)

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18nextOptions,
      backend: {
        loadPath: resolve('./public/translations/{{lng}}/{{ns}}.json'),
      },
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render want to use
    })

  // Then you can render your app wrapped in the I18nextProvider as in the
  // entry.client file
  const markup = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer context={context} url={request.url} />
    </I18nextProvider>,
  )

  headers.set('Content-Type', 'text/html')

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: statusCode,
    headers,
  })
}
