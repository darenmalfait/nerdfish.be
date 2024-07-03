/*eslint import/namespace: ['error', { allowComputed: true }]*/

import { type Schema } from 'tinacms'

import * as collections from './collections'

const schema: Schema = {
	collections: Object.keys(collections).map(
		(key) => collections[key as keyof typeof collections],
	),
}

export { schema }
