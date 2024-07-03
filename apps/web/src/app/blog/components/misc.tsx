'use client'

import { BackLink } from '~/app/common'
import { useGlobal } from '~/app/global-provider'

export function BackToBlog() {
	const { paths } = useGlobal()

	if (!paths?.blog) return null

	return <BackLink href={paths.blog}>All blog articles</BackLink>
}
