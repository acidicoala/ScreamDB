export function writeProp(key: string, value: any) {
	localStorage.setItem(key, value)
}

export function readProp(key: string, defaultValue: string) {
	let property = localStorage.getItem(key)
	if (!property) {
		property = key
		writeProp(key, defaultValue)
	}
	return property
}

export const maxWidth = 'lg'
