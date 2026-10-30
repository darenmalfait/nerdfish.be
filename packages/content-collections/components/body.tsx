import { type ComponentProps } from 'react'
import { MDXContent } from '@content-collections/mdx/react'

type BodyProps = Omit<ComponentProps<typeof MDXContent>, 'code'> & {
	content?: ComponentProps<typeof MDXContent>['code']
}

export function Body({ content, ...props }: BodyProps) {
	if (!content) return null

	return <MDXContent {...props} code={content} />
}
