import {BrowseMode, DisplayItem} from "../../util/types";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useLocale} from "../../hooks/locale";
import {GameRowSkeleton} from "../skeletons/GameRowSkeleton";
import {GameRow} from "../items/GameRow";

export function TableView(props: {
	items?: DisplayItem[],
	itemsPerPage: number,
	mode: BrowseMode
}) {
	const {items, itemsPerPage, mode} = props
	const {locale} = useLocale()

	return (
		<Box>
			<TableContainer>
				<Table size={'small'}>
					<TableHead>
						<TableRow>
							<TableCell>{locale.image}</TableCell>
							<TableCell>{locale.title}</TableCell>
							<TableCell>{locale.id}</TableCell>
							{mode === 'game' && <TableCell>{locale.namespace}</TableCell>}
						</TableRow>
					</TableHead>
					<TableBody>{
						items?.map(it =>
							<GameRow mode={mode} key={it.id} data={it}/>
						) ?? [...Array(itemsPerPage).keys()].map(it =>
							<GameRowSkeleton key={it}/>
						)
					}</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
