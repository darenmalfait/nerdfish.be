'use client'

import { BackLink } from '~/app/common'
import { useGlobal } from '~/app/global-provider'

export function BackToWork() {
	const { paths } = useGlobal()

	if (!paths?.work) return null

	return <BackLink href={paths.work}>See more work</BackLink>
}
