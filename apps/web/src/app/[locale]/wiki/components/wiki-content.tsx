import { H1, Separator } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { DateFormatter, Section, ReadingProgress } from '@repo/ui/components'
import { tinaField } from 'tinacms/dist/react'
import { BackToWiki } from './misc'
import { PortableText, type WikiQueryQuery } from '~/app/cms'

const prose = 'prose dark:prose-invert md:prose-lg lg:prose-xl max-w-4xl'

function WikiContent({ data }: { data: WikiQueryQuery }) {
	const { title, date, body } = data.wiki

	return (
		<>
			<ReadingProgress offset={400} />
			<Section className="max-w-4xl">
				<div className="mb-lg">
					<BackToWiki />
				</div>

				<header className={cx('flex max-w-4xl flex-col', prose)}>
					{date ? (
						<span
							className="text-muted mb-xs text-lg"
							data-tina-field={tinaField(data.wiki, 'date')}
						>
							Published{' '}
							<DateFormatter dateString={date} format="dd MMMM yyyy" />
						</span>
					) : null}
					<H1
						data-tina-field={tinaField(data.wiki, 'title')}
						className="w-auto"
					>
						{title}
					</H1>
				</header>

				<Separator className="my-lg container mx-auto max-w-4xl" />
				<div className={prose} data-tina-field={tinaField(data.wiki, 'body')}>
					{body ? <PortableText content={body} /> : null}
				</div>
			</Section>
		</>
	)
}

export { WikiContent }
