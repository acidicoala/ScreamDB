export const path = {
	to: {
		home: '/',
		games: '/games',
		dlc: (namespace?: any) => `/dlc/${namespace || ''}`,
	}
}
