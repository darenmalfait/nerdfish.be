import { MDXContent } from '@content-collections/mdx/react'
import { type ComponentProps } from 'react'

type BodyProperties = Omit<ComponentProps<typeof MDXContent>, 'code'> & {
	content?: ComponentProps<typeof MDXContent>['code']
}

export const Body = ({ content, ...props }: BodyProperties) => {
	if (!content) return null

	return <MDXContent {...props} code={content} />
}
