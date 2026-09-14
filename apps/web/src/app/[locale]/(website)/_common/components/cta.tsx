import { Button } from '@nerdfish/react/button'
import { ArrowRightIcon } from 'lucide-react'
import { Link } from '~/app/[locale]/_common/components/link'

export interface CtaProps {
	title: string
	subtitle: string
	link?: {
		href: string
		label: string
	}
}

export function Cta(props: CtaProps) {
	const { title, subtitle, link } = props

	return (
		<div className="gap-casual flex flex-col justify-between md:flex-row md:items-center">
			<div className="space-y-friends flex max-w-6xl flex-col lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
				<div className="space-y-best-friends">
					<h2 className="typography-heading-sm">{title}</h2>
					<h3 className="typography-title">{subtitle}</h3>
				</div>
			</div>

			{link?.href ? (
				<div>
					<Button
						size="xl"
						variant="accent"
						render={
							<Link href={link.href}>
								{link.label}
								<ArrowRightIcon className="ml-best-friends group-hover:translate-x-bff size-6 transition duration-300 xl:size-8" />
							</Link>
						}
					/>
				</div>
			) : null}
		</div>
	)
}
