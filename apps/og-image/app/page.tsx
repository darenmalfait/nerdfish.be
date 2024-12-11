import Head from 'next/head'
import * as React from 'react'

import './app.css'
import { Images } from './images'

export default function Page() {
	return (
		<div>
			<Head>
				<meta name="og:title" content="OG Image Playground" />
				<meta name="og:description" content="Playground for OG Images" />
			</Head>
			<main className="grid grid-flow-row grid-cols-2">
				<Images />
			</main>
		</div>
	)
}
