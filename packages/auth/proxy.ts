import {
	type NextFetchEvent,
	type NextProxy,
	type NextRequest,
} from 'next/server'
import { isAuthEnabled } from './enabled'

type AuthMiddlewareHandler = (
	auth: unknown,
	request: NextRequest,
	event: NextFetchEvent,
) => ReturnType<NextProxy>

function passThroughMiddleware(handler: AuthMiddlewareHandler): NextProxy {
	return (request, event) => handler(null, request, event)
}

export const authMiddleware = (
	isAuthEnabled()
		? // eslint-disable-next-line @typescript-eslint/no-var-requires -- optional at build time
			require('@clerk/nextjs/server').clerkMiddleware
		: passThroughMiddleware
) as (handler: AuthMiddlewareHandler) => NextProxy
