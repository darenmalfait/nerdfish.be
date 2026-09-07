'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Suspense, type ReactNode } from 'react'

/**
 * Isolates nuqs' useSearchParams() behind Suspense so static pages can
 * prerender. Keep this off the root layout tree that calls notFound() —
 * a Suspense ancestor there soft-404s (HTTP 200).
 *
 * Pass `enabled={false}` (or omit wrapping) when the subtree does not use
 * nuqs hooks — avoids an unnecessary Suspense/CSR bailout.
 */
export function NuqsProvider({
	children,
	enabled = true,
}: {
	children: ReactNode
	enabled?: boolean
}) {
	if (!enabled) return children

	return (
		<Suspense fallback={null}>
			<NuqsAdapter>{children}</NuqsAdapter>
		</Suspense>
	)
}
