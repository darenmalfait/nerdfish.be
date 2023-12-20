import {draftMode} from 'next/headers'
import {z} from 'zod'

import {env} from '~/env.mjs'

export async function GET() {
  try {
    draftMode().disable()

    return new Response(null, {
      status: 307,
      headers: {
        location: env.NEXT_PUBLIC_URL,
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
