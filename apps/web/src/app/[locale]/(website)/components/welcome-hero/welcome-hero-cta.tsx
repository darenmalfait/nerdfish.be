'use client'

import { MagnetButton } from '@repo/design-system/components/magnet'
import { Link } from '~/app/[locale]/common/components/link'

export function WelcomeHeroContactButton({ label }: { label: string }) {
	return (
		<MagnetButton
			size="xl"
			className="hover:bg-background-inverted/80!"
			render={<Link href="/contact">{label}</Link>}
		/>
	)
}
