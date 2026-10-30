export function byDateDesc(a: { date: string }, b: { date: string }) {
	return new Date(b.date).getTime() - new Date(a.date).getTime()
}
