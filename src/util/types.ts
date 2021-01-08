export interface DisplayItem {
	id: string,
	image_tall?: string,
	image_wide?: string,
	title: string,
	namespace?: string
}

export type ValidLanguage = 'en' | 'ru'
export type BrowseMode = 'game' | 'dlc'


type ImageType =
	| 'OfferImageWide'
	| 'OfferImageTall'
	| 'Thumbnail'
	| 'CodeRedemption_340x440'
	| 'DieselStoreFrontWide'
	| 'DieselStoreFrontTall'

interface GameImage {
	type: ImageType
	url: string
}

export interface GameItem {
	id: string,
	namespace: string
}

export interface GameElement extends GameItem {
	title: string,
	keyImages: GameImage[]
	items: GameItem[]
}

export interface Catalog {
	searchStore: {
		elements: GameElement[]
	}
}
