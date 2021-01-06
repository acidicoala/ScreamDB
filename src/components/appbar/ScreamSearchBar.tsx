import React, {useState} from "react";
import {createStyles, Divider, IconButton, InputBase, makeStyles, Paper} from "@material-ui/core";
import {ArrowForward, Clear, Search} from "@material-ui/icons";
import {useLocale} from "../../hooks/locale";

const useStyles = makeStyles(({spacing}) =>
	createStyles({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			background: 'rgb(0,0,0,0.2)',
			boxShadow: 'none',
			width: spacing(50),
		},
		input: {
			marginLeft: spacing(1),
			flex: 1,
		},
		iconButton: {
			padding: spacing(1),
		},
		divider: {
			height: 28,
			margin: 4,
		},
	}),
);

export function ScreamSearchBar() {
	const classes = useStyles()
	const [keywords, setKeywords] = useState('')
	const {locale} = useLocale()

	function onSearch() {
		console.log(keywords)
	}

	return (
		<Paper component="form" className={classes.root}>
			<Search className={classes.iconButton} fontSize={'large'}/>
			<InputBase
				className={classes.input}
				value={keywords}
				onChange={event => setKeywords(event.target.value)}
				placeholder={locale.search_games}
			/>
			<IconButton className={classes.iconButton} onClick={() => setKeywords('')}>
				<Clear/>
			</IconButton>
			<Divider className={classes.divider} orientation="vertical"/>
			<IconButton className={classes.iconButton} onClick={onSearch}>
				<ArrowForward/>
			</IconButton>
		</Paper>
	)
}
