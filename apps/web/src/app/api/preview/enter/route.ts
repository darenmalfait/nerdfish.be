import { env } from '@repo/env'
import { isUserAuthorized } from '@tinacms/auth'
import { draftMode } from 'next/headers'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

function parsePreviewUrl(unsafeUrl: string) {
	const url = new URL(unsafeUrl, 'http://localhost')
	const secret = url.searchParams.get('token')

	if (!secret) throw new Error('Missing secret')

	let redirectTo: string | undefined
	const unsafeRedirectTo = url.searchParams.get('slug')
	if (unsafeRedirectTo) {
		const { pathname, search, hash } = new URL(
			unsafeRedirectTo,
			'http://localhost'
		)
		redirectTo = `${pathname}${search}${hash}`
	}

	return { secret, redirectTo }
}

export async function GET(req: NextRequest) {
	try {
		const isLocal = env.NODE_ENV === 'development'

		const { redirectTo, secret } = parsePreviewUrl(req.url)

		const isAuthorizedRes = await isUserAuthorized({
			token: `Bearer ${secret}`,
			clientID: env.NEXT_PUBLIC_TINA_CLIENT_ID,
		})

		if (!isAuthorizedRes && !isLocal) {
			return new Response(null, { status: 401 })
		}

		console.info('Authorized for preview mode')

		draftMode().enable()

		return new Response(null, {
			status: 307,
			headers: {
				location: redirectTo,
			} as HeadersInit,
		})
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 })
		}

		console.error(error)

		return new Response(null, { status: 500 })
	}
}
