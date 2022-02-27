import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import {Box, IconButton, Tooltip, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {Launch} from "@material-ui/icons";
import {SadFace} from "../components/util/SadFace";
import {OfferRowData} from "../util/types";
import {useLocale} from "../hooks/locale";
import {sdk} from "../util/query";
import {Log} from "../util/log";
import {TableView} from "../components/views/TableView";
import {PaginatedContainer, usePaginationControls} from "../components/util/PaginatedContainer";
import {readProp, writeProp} from "../util/storage";
import {Element, OfferType} from "../generated/graphql";

export function Offers() {
	const {locale} = useLocale()
	const {namespace} = useParams<{ namespace?: string }>()

	const [filterID, setFilterID] = useState('')
	const [offers, setOffers] = useState<OfferRowData[]>()
	const [gameInfo, setGameInfo] = useState<Pick<Element, 'title' | 'catalogNs'>>()

	let initialOfferTypesFilters: Record<OfferType, boolean> = {
		ADD_ON: true,
		BASE_GAME: true,
		BUNDLE: true,
		EDITION: true,
		DLC: true,
		OTHERS: true,
		UNLOCKABLE: true,
	}

	try {
		const storedOfferTypeFilters = JSON.parse(readProp('type_filters', '{}'))
		initialOfferTypesFilters = {
			...initialOfferTypesFilters,
			...storedOfferTypeFilters
		}
	} catch (e) {
		Log.error(e)
	}

	const [offerTypeFilters, setOfferTypeFilters] = useState<Record<OfferType, boolean>>(initialOfferTypesFilters)

	const filteredOffers = offers
		?.filter(it => !filterID || it?.items?.some(item => item.id.includes(filterID)))
		?.filter(it => offerTypeFilters[it.offerType] === true)
		?.sort((first, second) => first.items.length - second.items.length)

	const pagination = usePaginationControls(filteredOffers)

	useEffect(() => {
		setOffers(undefined)

		if (!namespace) {
			setOffers([])
			return
		}

		sdk.searchOffers({namespace: namespace})
			.then(it => it.Catalog!)
			.then(catalog => {
				const gameInfo = catalog.searchStore.elements[0]
				const elements = catalog.catalogOffers.elements

				setGameInfo(gameInfo)
				setOffers(
					elements.map(element => ({
							id: element.id,
							title: element.title,
							offerType: element.offerType,
							items: element.items.map(item => ({
								title: elements.find(it => it.items.length === 1 && it.items[0].id === item.id)?.title,
								id: item.id
							})),
							image: // Images are not guaranteed to be present, so try to pick the most reasonable
								element.keyImages?.find(image => image.type === "OfferImageWide")?.url ??
								element.keyImages?.find(image => image.type === "DieselStoreFrontWide")?.url ??
								element.keyImages?.find(image => image.type === "Thumbnail")?.url ??
								element.keyImages?.find(image => image.type === "CodeRedemption_340x440")?.url ??
								element.keyImages?.find(image => image.type === "DieselStoreFrontTall")?.url ??
								element.keyImages?.find(image => image.type === "OfferImageTall")?.url ??
								undefined

						} as OfferRowData)
					)
				)
			})
			.catch(reason => {
				Log.error(reason)
				setOffers([])
			})
	}, [namespace])

	return (
		<Box display={'flex'} flexDirection={'column'}>{
			offers?.length === 0 ? <SadFace children={locale.no_offers}/> :
				<PaginatedContainer controls={pagination}>
					<Box display={'flex'} alignItems={'center'}>
						<Box flex={1} display={'flex'} alignItems={'center'}>{
							gameInfo ?
								<>
									<Typography variant={'h5'}
									            style={{textAlign: 'center'}}
									            children={locale.showing_offers + gameInfo.title}/>
									<Box marginX={1}/>
									<a target={'_blank'} rel="noreferrer"
									   href={'https://www.epicgames.com/store/product/' +
									   gameInfo.catalogNs.mappings[0].pageSlug}>
										<Tooltip placement={'right'}
										         title={<Typography variant={'caption'}
										                            children={locale.view_on_epic_store}/>
										         }>
											<IconButton children={<Launch/>}/>
										</Tooltip>
									</a>
								</> :
								<Skeleton variant="text" width={300} height={48}/>
						}</Box>
					</Box>
					<Box marginY={2}/>
					<TableView pagination={pagination}
					           setFilterID={setFilterID}
					           offerTypeFilters={offerTypeFilters}
					           setOfferTypeFilters={filters => {
						           setOfferTypeFilters(filters)
						           writeProp('type_filters', JSON.stringify(filters))
					           }}
					/>
				</PaginatedContainer>
		}</Box>
	)
}
