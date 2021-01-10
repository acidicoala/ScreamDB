import {OfferRowData} from "../../util/types";
import {
	Box,
	Button,
	ButtonGroup,
	Checkbox,
	Divider,
	FormControlLabel,
	FormGroup,
	Popover,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@material-ui/core";
import {useLocale} from "../../hooks/locale";
import {OfferRowSkeleton} from "../skeletons/OfferRowSkeleton";
import {usePaginationControls} from "../util/PaginatedContainer";
import React from "react";
import {SearchBar} from "../util/SearchBar";
import {OfferRow} from "../view-items/OfferRow";
import {useSM} from "../../hooks/screen-size";
import {bindPopover} from "material-ui-popup-state";
import {bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {OfferType} from "../../generated/graphql";

const usePaginationControlsWrapper = () => usePaginationControls<OfferRowData>()

export function TableView(props: {
	show: boolean
	pagination: ReturnType<typeof usePaginationControlsWrapper>
	setFilterID: (filter: string) => void
	offerTypeFilters: Record<OfferType, boolean>,
	setOfferTypeFilters: (types: Record<OfferType, boolean>) => void
}) {
	const {show, pagination, setFilterID, offerTypeFilters, setOfferTypeFilters} = props
	const {locale} = useLocale()
	const sm = useSM()


	const popupState = usePopupState({
		variant: 'popover',
		popupId: 'filter-offer-type',
	})

	function onSearch(query: string) {
		setFilterID(query)
		pagination.setPage(0)
	}

	return (
		<Box style={show ? {} : {display: 'none'}}>
			<Box display={'flex'} flexDirection={sm ? 'column' : 'row'}>
				<SearchBar placeholder={locale.search_by_id} onSearch={onSearch} onClear={onSearch}/>
				<Box margin={1} flex={1}/>
				<Button
					{...bindTrigger(popupState)}
					variant={'outlined'}
					children={locale.filter_by_offer_type}
					style={{marginRight: 'auto'}}
				/>
				<Popover
					{...bindPopover(popupState)}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<Box p={2}>
						<FormGroup>{
							Object.entries(offerTypeFilters).map(([type, enabled]) =>
								<FormControlLabel
									key={type}
									control={
										<Checkbox checked={enabled}
										          name="type"
										          color={'primary'}
										          onChange={event =>
											          setOfferTypeFilters({
												          ...offerTypeFilters,
												          [type]: event.target.checked
											          })
										          }/>}
									label={type}
								/>
							)}
						</FormGroup>
						<Divider/>
						<Box marginY={1}/>
						<ButtonGroup variant={'outlined'} size={'medium'}>
							<Button
								children={locale.clear_all}
								onClick={() => setOfferTypeFilters({
										...offerTypeFilters,
										...Object.fromEntries(Object.keys(offerTypeFilters).map((key) => [key, false]))
									}
								)}
							/>
							<Button
								children={locale.select_all}
								onClick={() => setOfferTypeFilters({
										...offerTypeFilters,
										...Object.fromEntries(Object.keys(offerTypeFilters).map((key) => [key, true]))
									}
								)}
							/>
						</ButtonGroup>
					</Box>
				</Popover>
			</Box>
			<Box marginY={2}/>
			<TableContainer>
				<Table size={'small'}>
					<TableHead>
						<TableRow>
							<TableCell/>
							<TableCell>{locale.image}</TableCell>
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
