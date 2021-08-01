import {Box, createStyles, makeStyles, Typography, useTheme} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {GameCardData, ValidSortDirection} from "../util/types";
import {useKeywords} from "../context/keywords";
import {sdk} from "../util/query";
import {SadFace} from "../components/util/SadFace";
import {useLocale} from "../hooks/locale";
import {Log} from "../util/log";
import {PaginatedContainer, usePaginationControls} from "../components/util/PaginatedContainer";
import {GameCard} from "../components/view-items/GameCard";
import {GameCardSkeleton} from "../components/skeletons/GameCardSkeleton";
import {KeyImageType} from "../generated/graphql";
import {SortBySelect, SortOption} from "../components/games/SortBySelect";
import {Sort} from "@material-ui/icons";
import {SortDirButton} from "../components/games/SortDirButton";
import {readProp} from "../util/storage";
import {ResponsiveBox} from "../components/util/ResponsiveBox";
import {Skeleton} from "@material-ui/lab";

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

export function Games() {
	const {spacing} = useTheme()
	const classes = useStyles()
	const {locale} = useLocale()
	const {keywords} = useKeywords()
	const [games, setGames] = useState<GameCardData[]>()
	const pagination = usePaginationControls(games)

	const [sortBy, setSortBy] = useState<SortOption>(
		readProp('sort_games_by', SortOption.RELEVANCE) as SortOption
	)
	const [sortDir, setSortDir] = useState<ValidSortDirection>(
		readProp('sort_games_dir', 'ASC') as ValidSortDirection
	)

	useEffect(() => {
		setGames(undefined)
		pagination.setPage(0)

		sdk.searchGames({keywords: keywords, sortBy: sortBy, sortDir: sortDir})
			.then(it => it.Catalog!.searchStore.elements)
			.then(elements => {
				setGames(
					elements.map<GameCardData>(element =>
						({
							id: element.id,
							title: element.title,
							namespace: element.namespace,
							image: element.keyImages?.find(image => image.type === KeyImageType.OfferImageTall)?.url,
							creationDate: new Date(element.creationDate)
						})
					)
				)
			})
			.catch(reason => {
				Log.error(reason)
				setGames([])
			})
	}, [keywords, sortBy, sortDir])

	return (
		<Box
			display={'flex'}
			flexDirection={'column'}> {
			games?.length === 0 ? <SadFace children={locale.no_games}/> :
				<PaginatedContainer controls={pagination} show={true}>
					<ResponsiveBox breakpoint={'sm'}>
						{games ?
							<Typography variant={'h5'} children={`${locale.found_games}: ${games.length}`}/> :
							<Skeleton variant={'text'} height={40} width={200}/>
						}
						<Box margin={1} flex={1}/>
						<ResponsiveBox breakpoint={'xs'} justifyContent={'flex-end'} alignItems={'flex-end'} paddingRight={2}>
							<Box display={'flex'} alignItems={'baseline'}>
								<Sort style={{transform: 'scale(-1,1)', alignSelf: 'center'}}/>
								<Box marginX={1}><Typography children={locale.sort_by}/></Box>
								<SortBySelect sortBy={sortBy} setSortBy={setSortBy}/>
							</Box>
							<Box margin={1}/>
							<Box>
								<SortDirButton sortDir={sortDir} setSortDir={setSortDir}/>
							</Box>
						</ResponsiveBox>
					</ResponsiveBox>
					<Box marginY={1}/>
					<Box className={classes.grid}>{
						pagination.pageItems()?.map(it =>
							<GameCard data={it}
							          style={{margin: spacing(2)}}
							          key={it.id}
							/>
						) ?? [...Array(pagination.itemsPerPage).keys()].map(it =>
							<GameCardSkeleton style={{margin: spacing(2)}} key={it}/>
						)
					}</Box>
				</PaginatedContainer>
		}</Box>
	)
}
