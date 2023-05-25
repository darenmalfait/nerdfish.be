import {draftMode} from 'next/headers'
import {NextRequest} from 'next/server'
import {isUserAuthorized} from '@tinacms/auth'
import {z} from 'zod'

import {env} from '~/env.mjs'

const routeContextSchema = z.object({
  token: z.string(),
  slug: z.string(),
})

export async function GET(req: NextRequest) {
  try {
    const isLocal = env.NODE_ENV == 'development'

    const searchParams = {
      token: req.nextUrl.searchParams.get('token'),
      slug: req.nextUrl.searchParams.get('slug'),
    }

    const params = routeContextSchema.parse(searchParams)

    const isAuthorizedRes = await isUserAuthorized({
      token: `Bearer ${params.token}`,
      clientID: env.NEXT_PUBLIC_TINA_CLIENT_ID,
    })

    if (!isAuthorizedRes && !isLocal) {
      return new Response(null, {status: 401})
    }

    console.info('Authorized for preview mode')

    draftMode().enable()

    return new Response(null, {
      status: 307,
      headers: {
        location: params.slug,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {status: 422})
    }

    console.error(error)

    return new Response(null, {status: 500})
  }
}
