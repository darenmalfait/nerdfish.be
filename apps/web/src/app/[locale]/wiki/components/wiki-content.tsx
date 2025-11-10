import { Badge } from '@nerdfish/react/badge'
import { Separator } from '@nerdfish/react/separator'
import { DateFormatter } from '@repo/calendar/components/date-formatter'
import { Section } from '@repo/design-system/components/section'
import { TextBalancer } from '@repo/design-system/components/text-balancer'
import { cx } from '@repo/lib/utils/base'
import { type Wiki } from 'content-collections'
import { BackToWiki } from './misc'
import { Body } from '~/app/components/body'

function WikiContent({ data }: { data: Wiki }) {
	const { title, date, body } = data

	return (
		<Section className="max-w-4xl">
			<div className="mb-casual">
				<BackToWiki />
			</div>
			<header className={cx('mx-auto flex max-w-4xl flex-col')}>
				{date ? (
					<div className="mb-best-friends">
						<Badge variant="muted">
							<DateFormatter dateString={date} format="dd MMMM yyyy" />
						</Badge>
					</div>
				) : null}
				<h1 className="typography-heading mt-0! w-auto">
					<TextBalancer>{title}</TextBalancer>
				</h1>
			</header>

			<Separator className="my-casual container max-w-4xl" />
			<div className="typography mx-auto max-w-4xl">
				{body ? <Body content={body} /> : null}
			</div>
		</Section>
	)
}

export { WikiContent }
