import {GameItem} from "../../util/types";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useLocale} from "../../hooks/locale";

export function TableView(props: {
	items?: GameItem[]
}) {
	const {items} = props
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
						</TableRow>
					</TableHead>
					<TableBody>{
						items?.map(it =>
							<TableRow key={it.id}>
								<TableCell>
									<img src={it.image_url}
									     alt={it.title}
									     width={75}
									     height={100}/>
								</TableCell>
								<TableCell>{it.title}</TableCell>
								<TableCell>{it.id}</TableCell>
							</TableRow>
						)
					}</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
