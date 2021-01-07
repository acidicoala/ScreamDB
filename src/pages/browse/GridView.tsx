import {GameCardSkeleton} from "../../components/skeletons/GameCardSkeleton";
import {GameCard} from "../../components/cards/GameCard";
import {Box, createStyles, makeStyles, useTheme} from "@material-ui/core";
import {GameItem} from "../../util/types";

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
	items?: GameItem[]
}) {
	const {items} = props
	const classes = useStyles()
	const {spacing} = useTheme()

	return (
		<Box className={classes.grid}>{
			items?.map(it =>
				<GameCard data={it}
				          style={{margin: spacing(2)}}
				          key={it.id}
				/>
			) ?? [...Array(10).keys()].map(it =>
				<GameCardSkeleton style={{margin: spacing(2)}} key={it}/>
			)
		}</Box>
	)
}
