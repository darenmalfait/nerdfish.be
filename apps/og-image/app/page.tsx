'use client'

import { env } from '@repo/env'
import { pageParams } from '@repo/og-utils/zod-params'
import Head from 'next/head'
import * as React from 'react'

import './app.css'

const OG_IMAGE_URL = `${env.NEXT_PUBLIC_URL}/api/og`

export default function Page() {
	const [nonce, setNonce] = React.useState(Math.random())

	React.useEffect(() => {
		// randomize nonce on window focus
		const handleFocus = () => setNonce(Math.random())
		window.addEventListener('focus', handleFocus)
		return () => window.removeEventListener('focus', handleFocus)
	}, [])

	return (
		<div>
			<Head>
				<meta name="og:title" content="OG Image Playground" />
				<meta name="og:description" content="Playground for OG Images" />
			</Head>
			<main className="grid grid-flow-row grid-cols-2">
				<div>
					<h2>Page Card</h2>
					<img
						alt="ayo"
						src={`${OG_IMAGE_URL}/page?${pageParams.toSearchString({
							heading: 'Inferring types is fun, but not really',
						})}&random=${nonce}`}
					/>
				</div>
			</main>
		</div>
	)
}
