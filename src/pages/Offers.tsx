import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import {Box, Typography} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {Code, ViewList} from "@material-ui/icons";
import {SadFace} from "../components/util/SadFace";
import {OfferRowData} from "../util/types";
import {useLocale} from "../hooks/locale";
import {sdk} from "../util/query";
import {Log} from "../util/log";
import {TableView} from "../components/views/TableView";
import {CodeView} from "../components/views/CodeView";
import {PaginatedContainer, usePaginationControls} from "../components/util/PaginatedContainer";
import {readProp, writeProp} from "../util/storage";
import {OfferType} from "../generated/graphql";

const PROP_KEY = 'filter_types'

export function Offers() {
	const {locale} = useLocale()
	const {namespace} = useParams<{ namespace?: string }>()
	const [view, setView] = useState<'table' | 'code'>('table');
	const [offers, setOffers] = useState<OfferRowData[]>()
	const [filterID, setFilterID] = useState('')

	let initialOfferTypesFilters: Record<OfferType, boolean> = {
		ADD_ON: true,
		BASE_GAME: false,
		BUNDLE: false,
		EDITION: false,
		DLC: true,
		OTHERS: false,
		UNLOCKABLE: true,
	}

	try {
		const storedOfferTypeFilters = JSON.parse(readProp(PROP_KEY, '{}'))
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

	const gameTitle = offers?.find(it => it.offerType === 'BASE_GAME')?.title

	useEffect(() => {
		setOffers(undefined)

		if (!namespace) {
			setOffers([])
			return
		}

		sdk.searchOffers({namespace: namespace})
			.then(it => it.Catalog!.catalogOffers.elements)
			.then(elements =>
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
			).catch(reason => {
			Log.error(reason)
			setOffers([])
		})
	}, [namespace])

	return (
		<Box marginY={4} display={'flex'} flexDirection={'column'}>{
			offers?.length === 0 ? <SadFace children={locale.no_offers}/> :
				<PaginatedContainer controls={pagination} show={view === 'table'}>
					<Box display={'flex'} alignItems={'center'}>
						<Box flex={1}>{
							offers && <Typography variant={'h5'} children={locale.showing_offers + gameTitle}/>
						}   </Box>
						<Typography children={locale.view}/>
						<Box marginX={1}/>
						<ToggleButtonGroup
							value={view}
							exclusive
							onChange={(_, newView) => newView && setView(newView)}
						>
							<ToggleButton value="table" children={<ViewList/>}/>
							<ToggleButton value="code" children={<Code/>}/>
						</ToggleButtonGroup>
					</Box>
					<Box marginY={2}/>
					<TableView pagination={pagination}
					           setFilterID={setFilterID}
					           show={view === 'table'}
					           offerTypeFilters={offerTypeFilters}
					           setOfferTypeFilters={types => {
						           setOfferTypeFilters(types)
						           writeProp(PROP_KEY, JSON.stringify(types))
					           }}
					/>
					<CodeView offers={filteredOffers} show={view === 'code'}/>
				</PaginatedContainer>
		}</Box>
	)
}
