'use client'

import { blogParams, pageParams } from '@repo/og-utils/zod-params'
import { env } from 'env'
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
				<h2>/api/og</h2>
				<img
					alt="ayo"
					src={`${OG_IMAGE_URL}?${pageParams.toSearchString({
						heading: 'Inferring types is fun, but not really',
					})}&random=${nonce}`}
				/>
			</div>
			<div>
				<h2>/api/og/blog</h2>
				<img
					alt="ayo"
					src={`${OG_IMAGE_URL}/blog?${blogParams.toSearchString({
						title:
							'This is a very long blog title which should be truncated after a certain amount of characters',
						image: 'http://localhost:4200/dummy-image.png',
					})}&random=${nonce}`}
				/>
			</div>
		</div>
	)
}
