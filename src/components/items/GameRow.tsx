import React, {PropsWithChildren} from "react"
import {BrowseMode, DisplayItem} from "../../util/types";
import {TableCell, TableRow} from "@material-ui/core";
import {ScreamLink} from "../util/Link";
import {path} from "../../util/paths";

export function GameRow(props: { mode: BrowseMode, data: DisplayItem }) {
	const {mode, data} = props

	function OptionalLink(props: PropsWithChildren<{}>) {
		const {children} = props
		return (
			<>{mode === 'dlc' ? children :
				<ScreamLink to={path.to.dlc(data.namespace)} children={children}/>
			}</>
		)
	}

	return (
		<TableRow key={data.id}>
			<TableCell width={100}>
				<OptionalLink>
					<img src={data.image_wide}
					     alt={data.title}
					     style={{objectFit: 'cover'}}
					     width={88.88}
					     height={50}/>
				</OptionalLink>
			</TableCell>
			<TableCell><OptionalLink children={data.title}/></TableCell>
			<TableCell><OptionalLink children={data.id}/></TableCell>
			{mode === 'game' && <TableCell><OptionalLink children={data.namespace}/></TableCell>}
		</TableRow>
	)
}
