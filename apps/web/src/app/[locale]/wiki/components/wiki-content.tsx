import { DateFormatter } from '@repo/calendar/components/date-formatter'
import { ReadingProgress } from '@repo/design-system/components/reading-progress'
import { Section } from '@repo/design-system/components/section'
import { TextBalancer } from '@repo/design-system/components/text-balancer'
import { H1, Separator } from '@repo/design-system/components/ui'
import { cx } from '@repo/lib/utils/base'
import { type Wiki } from 'content-collections'
import { BackToWiki } from './misc'
import { Body } from '~/app/components/body'

const prose = 'prose md:prose-lg lg:prose-xl max-w-4xl'

function WikiContent({ data }: { data: Wiki }) {
	const { title, date, body } = data

	return (
		<>
			<ReadingProgress title={title} offset={400} />
			<Section className="max-w-4xl">
				<div className="mb-lg">
					<BackToWiki />
				</div>

				<header className={cx('flex max-w-4xl flex-col', prose)}>
					{date ? (
						<span className="mb-xs text-foreground-muted text-lg">
							<DateFormatter dateString={date} format="dd MMMM yyyy" />
						</span>
					) : null}
					<H1 className="w-auto" variant="primary">
						<TextBalancer>{title}</TextBalancer>
					</H1>
				</header>

				<Separator className="my-lg container max-w-4xl" />
				<div className={prose}>{body ? <Body content={body} /> : null}</div>
			</Section>
		</>
	)
}

export { WikiContent }
