import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request }) => {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

  try {
    // if we can  a HEAD request to ourselves, then we're good.
    await Promise.all([
      fetch(`http://${host}`, { method: 'HEAD' }).then(r => {
        if (!r.ok) return Promise.reject(r)
      }),
    ])
    return new Response('OK')
  } catch (error: unknown) {
    console.error('healthcheck ❌', { error })
    return new Response('ERROR', { status: 500 })
  }
}
