import React, {CSSProperties} from "react";
import {Skeleton} from "@material-ui/lab";
import {TableCell, TableRow} from "@material-ui/core";

export function GameRowSkeleton(props?: { style?: CSSProperties }) {
	return (
		<TableRow style={props?.style}>
			<TableCell width={100}>
				<Skeleton variant="rect" width={88.88} height={50}/>
			</TableCell>
			<TableCell><Skeleton variant="text"/></TableCell>
			<TableCell><Skeleton variant="text"/></TableCell>
			<TableCell><Skeleton variant="text"/></TableCell>
		</TableRow>
	)
}
