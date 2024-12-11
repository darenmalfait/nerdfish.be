import { env } from '@repo/env'
import { fontParams } from './zod-params'

export const fetchFont = (family: string, weight?: number, text?: string) =>
	fetch(
		`${env.NEXT_PUBLIC_URL}/api/font?${fontParams.toSearchString({
			family,
			weight,
			text,
		})}`,
	).then((res) => res.arrayBuffer())
