import { H1, Separator } from '@nerdfish/ui'
import { cx } from '@nerdfish/utils'
import { DateFormatter } from '@nerdfish-website/ui/components/date-formatter.tsx'
import { tinaField } from 'tinacms/dist/react'

import { BackToWiki } from './misc'
import { PortableText, type WikiQueryQuery } from '~/app/cms'
import { ReadingProgress } from '~/app/common'

const prose = 'prose dark:prose-invert md:prose-lg lg:prose-xl max-w-4xl'

function WikiContent({ data }: { data: WikiQueryQuery }) {
	const { title, date, body } = data.wiki

	return (
		<>
			<ReadingProgress offset={400} />
			<section className="container mx-auto mb-8 mt-24 max-w-4xl px-4">
				<div className="mb-6">
					<BackToWiki />
				</div>

				<header className={cx('flex flex-col', prose)}>
					<span
						className="text-muted mb-4 text-lg"
						data-tina-field={tinaField(data.wiki, 'date')}
					>
						<DateFormatter dateString={date} format="dd MMMM yyyy" />
					</span>
					{title ? (
						<H1 data-tina-field={tinaField(data.wiki, 'title')}>{title}</H1>
					) : null}
				</header>
			</section>
			<Separator className="container mx-auto my-12 max-w-4xl px-4" />
			<section
				className={cx('container mx-auto px-4', prose)}
				data-tina-field={tinaField(data.wiki, 'body')}
			>
				{body ? <PortableText content={body} /> : null}
			</section>
		</>
	)
}

export { WikiContent }
