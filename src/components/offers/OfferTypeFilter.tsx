import {Box, Button, ButtonGroup, Checkbox, Divider, FormControlLabel, FormGroup, Popover} from "@material-ui/core";
import {bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {bindPopover} from "material-ui-popup-state";
import React from "react";
import {OfferType} from "../../generated/graphql";
import {useLocale} from "../../hooks/locale";

export function OfferTypeFilter(props:{
	offerTypeFilters: Record<OfferType, boolean>,
	setOfferTypeFilters: (typeFilters: Record<OfferType, boolean>) => void
}){
	const {offerTypeFilters,setOfferTypeFilters} = props
	const {locale} = useLocale()
	const popupState = usePopupState({
		variant: 'popover',
		popupId: 'filter-offer-type',
	})

	return (
		<>
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
									          onChange={async event =>
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
		</>
	)
}
