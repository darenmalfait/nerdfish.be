'use client'

import { env } from '@repo/env'
import { pageParams } from '@repo/og-utils/zod-params'
import * as React from 'react'

const OG_IMAGE_URL = `${env.NEXT_PUBLIC_URL}/api/og`

export function Images() {
	const [nonce, setNonce] = React.useState(Math.random())

	React.useEffect(() => {
		// randomize nonce on window focus
		const handleFocus = () => setNonce(Math.random())
		window.addEventListener('focus', handleFocus)
		return () => window.removeEventListener('focus', handleFocus)
	}, [])

	return (
		<div className="flex flex-col gap-12">
			<div>
				<h2>Page Card</h2>
				<img
					alt="ayo"
					src={`${OG_IMAGE_URL}?${pageParams.toSearchString({
						heading: 'Inferring types is fun, but not really',
					})}&random=${nonce}`}
				/>
			</div>
		</div>
	)
}
