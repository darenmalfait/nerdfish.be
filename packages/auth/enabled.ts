/** True when both Clerk keys are present and look valid. */
export function isAuthEnabled(): boolean {
	const secret = process.env.CLERK_SECRET_KEY
	const publishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

	return (
		typeof secret === 'string' &&
		secret.startsWith('sk_') &&
		typeof publishable === 'string' &&
		publishable.startsWith('pk_')
	)
}
