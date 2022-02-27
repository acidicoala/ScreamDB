import React, {PropsWithChildren, useRef, useState} from "react"
import {Box, TablePagination} from "@material-ui/core";
import {readProp, writeProp} from "../../util/storage";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {ruRU, enUS, esES, zhCN} from "@material-ui/core/locale";
import {useLanguage} from "../../context/language";

const PROP_KEY = 'item_per_page'

export function usePaginationControls<T>(items?: T[]) {
	const storedItemsPerPage = Number(readProp('item_per_page', '10'))
	const [itemsPerPage, setItemsPerPage] = useState<number>(storedItemsPerPage ? storedItemsPerPage : 10)
	const [page, setPage] = useState(0)

	return {
		itemsPerPage: itemsPerPage,
		setItemsPerPage: setItemsPerPage,
		page: page,
		setPage: setPage,
		items: items,
		pageItems: () => items?.slice(page * itemsPerPage, (page + 1) * itemsPerPage) // slice for pagination
	}
}

export function PaginatedContainer(props: PropsWithChildren<{
	controls: ReturnType<typeof usePaginationControls>
	show: boolean
}>) {
	const {controls, children, show} = props
	const {items, itemsPerPage, page, setItemsPerPage, setPage} = controls

	const {lang} = useLanguage()

	const locale = {
		en: enUS,
		es: esES,
		ru: ruRU,
		zh: zhCN
	}[lang]

	const containerRef = useRef<HTMLDivElement>(null)

	return (
		<Box {...{ref: containerRef}} paddingY={4}>
			{children}
			<Box marginY={2}/>{
			show && items &&
			<ThemeProvider theme={(outerTheme) => createTheme(outerTheme, locale)}>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50, 100, 1000]}
					component="div"
					count={items.length}
					rowsPerPage={itemsPerPage}
					page={page}
					onPageChange={(e, page) => {
						containerRef?.current?.scrollIntoView()
						setPage(page)
					}}
					onChangeRowsPerPage={event => {
						setItemsPerPage(parseInt(event.target.value, 10))
						writeProp(PROP_KEY, event.target.value)
						setPage(0)
					}}
				/>
			</ThemeProvider>
		}</Box>
	)
}
