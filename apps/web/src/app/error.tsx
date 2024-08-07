'use client'

import { ErrorPage } from './components/errors'

export default function Error({ error }: { error?: Error }) {
	return (
		<ErrorPage title="Oh no, something went wrong!" subtitle={error?.message} />
	)
}
