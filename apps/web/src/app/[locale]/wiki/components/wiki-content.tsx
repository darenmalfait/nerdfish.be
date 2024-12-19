import { cx } from '@nerdfish/utils'
import { DateFormatter } from '@repo/design-system/components/date-formatter'
import { ReadingProgress } from '@repo/design-system/components/reading-progress'
import { Section } from '@repo/design-system/components/section'
import { TextBalancer } from '@repo/design-system/components/text-balancer'
import { H1, Separator } from '@repo/design-system/components/ui'
import { tinaField } from 'tinacms/dist/react'
import { BackToWiki } from './misc'
import { PortableText } from '~/app/cms/components/portable-text'
import { type WikiQueryQuery } from '~/app/cms/types'

const prose = 'prose dark:prose-invert md:prose-lg lg:prose-xl max-w-4xl'

function WikiContent({ data }: { data: WikiQueryQuery }) {
	const { title, date, body } = data.wiki

	return (
		<>
			<ReadingProgress title={title} offset={400} />
			<Section className="max-w-4xl">
				<div className="mb-lg">
					<BackToWiki />
				</div>

				<header className={cx('flex max-w-4xl flex-col', prose)}>
					{date ? (
						<span
							className="mb-xs text-muted text-lg"
							data-tina-field={tinaField(data.wiki, 'date')}
						>
							<DateFormatter dateString={date} format="dd MMMM yyyy" />
						</span>
					) : null}
					<H1
						data-tina-field={tinaField(data.wiki, 'title')}
						className="w-auto"
					>
						<TextBalancer>{title}</TextBalancer>
					</H1>
				</header>

				<Separator className="my-lg container max-w-4xl" />
				<div className={prose} data-tina-field={tinaField(data.wiki, 'body')}>
					{body ? <PortableText content={body} /> : null}
				</div>
			</Section>
		</>
	)
}

export { WikiContent }
