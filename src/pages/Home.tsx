import {Box, createStyles, makeStyles} from "@material-ui/core";

import ReactMarkdown from 'react-markdown'
import React, {useEffect, useState} from "react";
import home_en from "../md/home_en.md"
import home_es from "../md/home_es.md"
import home_ru from "../md/home_ru.md"
import {useLanguage} from "../context/language";

const useStyles = makeStyles(() =>
	createStyles({
		home: {
			'& a': {
				color: '#0E0',
				textDecoration: 'none',
				'&:hover': {
					textDecoration: 'underline',
				}
			}
		},
	}),
);

export function Home() {
	const {lang} = useLanguage()
	const classes = useStyles()

	const [home, setHome] = useState({
		en: '',
		es: '',
		ru: '',
	})

	useEffect(() => {
		const en = fetch(home_en).then(file => file.text())
		const es = fetch(home_es).then(file => file.text())
		const ru = fetch(home_ru).then(file => file.text())

		Promise.all([en, es, ru]).then(([en, es, ru]) => setHome({
			en: en,
			es: es,
			ru: ru,
		}))
	}, [])

	return (
		<Box className={classes.home}>
			<ReactMarkdown source={home[lang]}/>
		</Box>
	)
}
