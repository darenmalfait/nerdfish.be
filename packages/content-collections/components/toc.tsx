import { getTableOfContents } from 'fumadocs-core/server'

type TableOfContentsProperties = {
	data: string
}

export const TableOfContents = ({ data }: TableOfContentsProperties) => {
	const toc = getTableOfContents(data)

	return (
		<ul className="gap-bff flex list-none flex-col text-sm">
			{toc.map((item) => (
				<li
					key={item.url}
					style={{
						paddingLeft: `${item.depth - 2}rem`,
					}}
				>
					<a
						href={item.url}
						className="text-foreground decoration-foreground/0 hover:decoration-foreground/50 line-clamp-3 flex rounded-sm text-sm underline transition-colors"
					>
						{item.title}
					</a>
				</li>
			))}
		</ul>
	)
}
