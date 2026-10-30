export function withXDefault(
	languages: Record<string, string>,
	defaultPath: string,
): Record<string, string> {
	return {
		...languages,
		'x-default': defaultPath,
	}
}
