import React from "react";
import {KeyboardArrowDown} from "@material-ui/icons";
import {ValidSortOption} from "../../util/types";
import {CustomSelect} from "../util/CustomSelect";
import {useLocale} from "../../hooks/locale";
import {writeProp} from "../../util/storage";

export function SortBySelect(props: {
	sortBy: ValidSortOption
	setSortBy: (option: ValidSortOption) => void
}) {
	const {locale} = useLocale()
	const {sortBy, setSortBy} = props

	const sortOptions = [
		{key: 'title', text: locale.sort_title},
		{key: 'creationDate', text: locale.sort_creation_date}
	]

	return (
		<CustomSelect
			size={'large'}
			style={{textTransform: 'none'}}
			variant={'outlined'}
			endIcon={<KeyboardArrowDown/>}
			items={sortOptions}
			onItemSelect={item => {
				setSortBy(item.key as ValidSortOption)
				writeProp('sort_games_by', item.key)
			}}
			children={sortOptions.find(it => it.key === sortBy)?.text}
		/>
	)
}
