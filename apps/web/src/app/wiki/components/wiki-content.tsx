import { H1, H6 } from '@nerdfish/ui'
import { DateFormatter } from '@nerdfish-website/ui/components/date-formatter.tsx'
import { tinaField } from 'tinacms/dist/react'

import { BackToWiki } from './misc'
import { PortableText, type WikiQueryQuery } from '~/app/cms'

function WikiContent({ data }: { data: WikiQueryQuery }) {
	const { title, date, body } = data.wiki

	return (
		<>
			<section>
				<div className="container mx-auto mb-14 mt-24 max-w-4xl px-4 lg:mb-24">
					<BackToWiki />
				</div>

				<header className="container mx-auto mb-12 mt-6 max-w-4xl px-4">
					{title ? (
						<H1 data-tina-field={tinaField(data.wiki, 'title')}>{title}</H1>
					) : null}
					{date ? (
						<H6
							data-tina-field={tinaField(data.wiki, 'date')}
							as="p"
							variant="secondary"
						>
							<DateFormatter dateString={date} format="dd MMMM yyyy" />
						</H6>
					) : null}
				</header>
			</section>
			<section
				className="prose dark:prose-invert md:prose-lg lg:prose-xl container mx-auto px-4"
				data-tina-field={tinaField(data.wiki, 'body')}
			>
				{body ? <PortableText content={body} /> : null}
			</section>
		</>
	)
}

export { WikiContent }
