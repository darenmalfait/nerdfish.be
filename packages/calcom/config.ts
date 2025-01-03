export const calcomSettings = {
	profileName: 'nerdfish',
	types: [
		{
			slug: '30min',
			title: {
				en: '30 Minute Session',
				nl: 'Sessie van 30 minuten',
			},
			duration: 30,
		},
		{
			slug: '1hour',
			title: {
				en: '1 Hour Session',
				nl: 'Sessie van 1 uur',
			},
			duration: 60,
		},
	],
} as const

export type CalComMeetingTypes = (typeof calcomSettings.types)[number]['slug']
