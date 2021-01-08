import {Box, TablePagination} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {GridView} from "../components/views/GridView";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {Code, ViewList, ViewModule} from "@material-ui/icons";
import {TableView} from "../components/views/TableView";
import {BrowseMode, DisplayItem, GameElement} from "../util/types";
import {useKeywords} from "../context/keywords";
import {searchDLCs, searchGames} from "../util/query";
import {SadFace} from "../components/util/SadFace";
import {useLocale} from "../hooks/locale";
import {useLocation, useParams} from "react-router-dom"
import {path} from "../util/paths";
import {CodeView} from "../components/views/CodeView";
import {Log} from "../util/log";

export function Browse() {
	const [view, setView] = useState<'grid' | 'table' | 'code'>('grid');
	const [items, setItems] = useState<DisplayItem[]>()
	const {keywords} = useKeywords()
	const location = useLocation()

	const {namespace} = useParams<{ namespace?: string }>()
	const {locale} = useLocale()
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [page, setPage] = useState(0)

	const slicedItems = items?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
	const mode: BrowseMode = location.pathname === path.to.games ? 'game' : 'dlc'

	useEffect(() => {
		setItems(undefined)
		setView('grid')
		setPage(0)

		const makeDisplayItem = (id: string, element: GameElement): DisplayItem => ({
			id: id,
			image_tall: element.keyImages.find(image => image.type === "OfferImageTall")?.url,
			image_wide: element.keyImages.find(image => image.type === "OfferImageWide")?.url,
			title: element.title,
			namespace: element.namespace,
		});

		const request = mode === 'game' ? searchGames(keywords) : searchDLCs(namespace ?? '')
		request.then(elements => {
			setItems(mode === 'game' ?
				elements.map(element => makeDisplayItem(element.id, element)) :
				elements.flatMap(element => element.items.map(
					// DLC offers may contain more than 1 item, so we need to unpack them
					item => makeDisplayItem(item.id, element)
				))
			)
		}).catch(reason => {
			Log.error(reason)
			setItems([])
		})
	}, [mode, keywords, namespace])

	return (
		<Box marginY={4} display={'flex'} flexDirection={'column'}>
			<ToggleButtonGroup
				value={view}
				exclusive
				onChange={(_, newView) => newView && setView(newView)}
				style={{
					marginLeft: 'auto',
					marginRight: 8,
				}}
			>
				<ToggleButton value="grid" children={<ViewModule/>}/>
				<ToggleButton value="table" children={<ViewList/>}/>
				{mode === 'dlc' && <ToggleButton value="code" children={<Code/>}/>}
			</ToggleButtonGroup>
			{items?.length === 0 ? <SadFace children={mode === 'game' ? locale.no_games : locale.no_dlc}/> :
				<>
					{view === 'grid' && <GridView items={slicedItems} itemsPerPage={itemsPerPage} mode={mode}/>}
					{view === 'table' && <TableView itemsPerPage={itemsPerPage} items={slicedItems} mode={mode}/>}
					{view === 'code' && <CodeView items={items}/>}
					<Box marginY={2}/>
					{items && view !== 'code' && <TablePagination
						rowsPerPageOptions={[5, 10, 25, 50, 100]}
						component="div"
						count={items.length}
						rowsPerPage={itemsPerPage}
						page={page}
						onChangePage={(e, page) => setPage(page)}
						onChangeRowsPerPage={event => {
							setItemsPerPage(parseInt(event.target.value, 10))
							setPage(0)
						}}
					/>}
				</>
			}
		</Box>
	)
}
