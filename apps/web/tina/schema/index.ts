import type { Schema } from 'tinacms'

import { collections } from './collections'

const schema: Schema = {
	collections: Object.keys(collections).map(
		(key) => collections[key as keyof typeof collections]
	),
}

export { schema }
