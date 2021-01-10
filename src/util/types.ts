import {Item, OfferType} from "../generated/graphql";

export interface GameCardData {
	id: string,
	title: string,
	namespace: string
	image?: string,
}

export interface OfferRowData {
	id: string,
	title: string,
	offerType: OfferType
	items: Pick<Item, 'id' | 'title'>[]
	image?: string,
}

export type ValidLanguage = 'en' | 'ru'
