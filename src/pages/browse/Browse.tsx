import {Box, Button, TablePagination} from "@material-ui/core";
import {useState} from "react";
import {GridView} from "./GridView";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {ViewList, ViewModule} from "@material-ui/icons";
import {TableView} from "./TableView";
import {GameItem} from "../../util/types";


export function Browse() {
	const [view, setView] = useState<'grid' | 'table'>('grid');
	const [games, setGames] = useState<GameItem[]>()

	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [page, setPage] = useState(0)

	const slicedGames = games?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)

	const mockItems = new Array<GameItem>()
	Array(20).fill(1).forEach(() => mockItems.push({
		id: Math.random().toString(),
		image_url: 'https://cdn1.epicgames.com/6009be9994c2409099588cde6f3a5ed0/offer/EGS_CitiesSkylinesCCPModernCityCenter_ColossalOrder_DLC_S2-1200x1600-17d8efed248496bbe23d5ebbdf93e7d2.jpg?h=854&resize=1&w=640',
		title: 'Cities: Skylines - Content Creator Pack: Modern City Center'
	}))

	return (
		<Box marginY={4} display={'flex'} flexDirection={'column'}>
			<Button onClick={() => {
				// TODO: delete this button
				setGames(games ? undefined : mockItems)
			}} children={'Toggle loading'}/>
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
				{/*<ToggleButton value="code" children={<Code/>}/>*/}
			</ToggleButtonGroup>
			{view === 'grid' && <GridView items={slicedGames}/>}
			{view === 'table' && <TableView items={slicedGames}/>}
			{/*{view === 'code' && <CodeView loading={loading}/>}*/}
			<Box marginY={2}/>
			{games && <TablePagination
				rowsPerPageOptions={[5, 10, 25, 50, 100]}
				component="div"
				count={games.length}
				rowsPerPage={itemsPerPage}
				page={page}
				onChangePage={(e, page) => setPage(page)}
				onChangeRowsPerPage={event => {
					setItemsPerPage(parseInt(event.target.value, 10))
					setPage(0)
				}}
			/>}
		</Box>

	)
}
