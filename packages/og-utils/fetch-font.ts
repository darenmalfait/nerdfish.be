import { keys as core } from '@repo/next-config/keys'
import { fontParams } from './zod-params'

export const fetchFont = (family: string, weight?: number, text?: string) =>
	fetch(
		`${core().NEXT_PUBLIC_URL}/api/font?${fontParams.toSearchString({
			family,
			weight,
			text,
		})}`,
	).then((res) => res.arrayBuffer())
