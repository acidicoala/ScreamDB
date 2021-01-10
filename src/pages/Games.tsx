import {Box, createStyles, makeStyles, useTheme} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {GameCardData} from "../util/types";
import {useKeywords} from "../context/keywords";
import {sdk} from "../util/query";
import {SadFace} from "../components/util/SadFace";
import {useLocale} from "../hooks/locale";
import {Log} from "../util/log";
import {PaginatedContainer, usePaginationControls} from "../components/util/PaginatedContainer";
import {GameCard} from "../components/view-items/GameCard";
import {GameCardSkeleton} from "../components/skeletons/GameCardSkeleton";
import {KeyImageType} from "../generated/graphql";

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
	const [items, setItems] = useState<GameCardData[]>()
	const pagination = usePaginationControls(items)

	useEffect(() => {
		setItems(undefined)
		pagination.setPage(0)


		sdk.searchGames({keywords: keywords})
			.then(it => it.Catalog!.searchStore.elements)
			.then(elements => {
				setItems(
					elements.map(element => ({
							id: element.id,
							title: element.title,
							namespace: element.namespace,
							image: element.keyImages?.find(image => image.type === KeyImageType.OfferImageTall)?.url
						} as GameCardData)
					).sort((first, second) => first.title.localeCompare(second.title))
				)
			})
			.catch(reason => {
				Log.error(reason)
				setItems([])
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keywords])

	return (
		<Box display={'flex'} flexDirection={'column'}>{
			items?.length === 0 ? <SadFace children={locale.no_games}/> :
				<PaginatedContainer controls={pagination} show={true}>
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
