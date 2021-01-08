import {GameCardSkeleton} from "../skeletons/GameCardSkeleton";
import {GameCard} from "../items/GameCard";
import {Box, createStyles, makeStyles, useTheme} from "@material-ui/core";
import {BrowseMode, DisplayItem} from "../../util/types";

const useStyles = makeStyles(({breakpoints}) =>
	createStyles({
		grid: {
			display: 'flex',
			margin: 'auto',
			flexWrap: 'wrap',
			justifyContent: 'center',
			width: '100%',
			maxWidth: '100%',
			[breakpoints.up('sm')]: {
				maxWidth: breakpoints.values.sm,
			},
			[breakpoints.up('md')]: {
				maxWidth: breakpoints.values.md,
			},
			[breakpoints.up('lg')]: {
				maxWidth: breakpoints.values.lg,
			},

		},
	}),
);

export function GridView(props: {
	items?: DisplayItem[],
	itemsPerPage: number,
	mode: BrowseMode,
}) {
	const {items,itemsPerPage, mode} = props
	const classes = useStyles()
	const {spacing} = useTheme()

	return (
		<Box className={classes.grid}>{
			items?.map(it =>
				<GameCard data={it}
				          mode={mode}
				          style={{margin: spacing(2)}}
				          key={it.id}
				/>
			) ?? [...Array(itemsPerPage).keys()].map(it =>
				<GameCardSkeleton style={{margin: spacing(2)}} key={it}/>
			)
		}</Box>
	)
}
