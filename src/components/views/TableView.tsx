import {OfferRowData} from "../../util/types";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useLocale} from "../../hooks/locale";
import {OfferRowSkeleton} from "../skeletons/OfferRowSkeleton";
import {usePaginationControls} from "../util/PaginatedContainer";
import React from "react";
import {SearchBar} from "../util/SearchBar";
import {OfferRow} from "../view-items/OfferRow";
import {OfferType} from "../../generated/graphql";
import {OfferTypeFilter} from "../offers/OfferTypeFilter";
import {ResponsiveBox} from "../util/ResponsiveBox";

const usePaginationControlsWrapper = () => usePaginationControls<OfferRowData>()

export function TableView(props: {
	pagination: ReturnType<typeof usePaginationControlsWrapper>
	setFilterID: (idFilter: string) => void
	offerTypeFilters: Record<OfferType, boolean>,
	setOfferTypeFilters: (typeFilters: Record<OfferType, boolean>) => void
}) {
	const {pagination, setFilterID, offerTypeFilters, setOfferTypeFilters} = props
	const {locale} = useLocale()

	function onSearch(query: string) {
		setFilterID(query)
		pagination.setPage(0)
	}

	return (
		<Box>
			<ResponsiveBox breakpoint={'sm'}>
				<SearchBar placeholder={locale.search_by_id} onSearch={onSearch} onClear={onSearch}/>
				<Box margin={1} flex={1}/>
				<OfferTypeFilter offerTypeFilters={offerTypeFilters} setOfferTypeFilters={setOfferTypeFilters}/>
			</ResponsiveBox>
			<Box marginY={2}/>
			<TableContainer>
				<Table size={'small'}>
					<TableHead>
						<TableRow>
							<TableCell width={48}/>
							<TableCell style={{textAlign: 'center'}}>{locale.image}</TableCell>
							<TableCell>{locale.title}</TableCell>
							<TableCell>{locale.id}</TableCell>
							<TableCell>{locale.offer_type}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{
						pagination.pageItems()?.map(item =>
							<OfferRow data={item} key={item.id}/>
						) ?? [...Array(pagination.itemsPerPage).keys()].map(it =>
							<OfferRowSkeleton key={it}/>
						)
					}</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
