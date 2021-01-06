import {Box, Button, createStyles, makeStyles, useTheme} from "@material-ui/core";
import {useState} from "react";
import {GameCard} from "../components/cards/GameCard";
import {GameCardSkeleton} from "../components/skeletons/GameCardSkeleton";

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

export function Browse() {
	const classes = useStyles()
	const [loading, setLoading] = useState(true)
	const {spacing} = useTheme()

	return (
		<Box marginY={4} display={'flex'} flexDirection={'column'}>
			<Button onClick={() => setLoading(!loading)} children={'Toggle loading'}/>
			<Box className={classes.grid}>{
				loading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() =>
					<GameCardSkeleton style={{margin: spacing(2)}}/>
				) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() =>
					<GameCard
						image_url={'https://cdn1.epicgames.com/6009be9994c2409099588cde6f3a5ed0/offer/EGS_CitiesSkylinesCCPModernCityCenter_ColossalOrder_DLC_S2-1200x1600-17d8efed248496bbe23d5ebbdf93e7d2.jpg?h=854&resize=1&w=640'}
						title={'Cities: Skylines - Content Creator Pack: Modern City Center'}
						style={{margin: spacing(2)}}
					/>
				)
			}</Box>
		</Box>

	)
}
