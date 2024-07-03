import { type TinaField } from 'tinacms'

type ObjectField = TinaField & {
	type: 'object'
	fields: TinaField[]
}

export type { ObjectField }
