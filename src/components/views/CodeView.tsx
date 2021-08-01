import React from "react"
import {OfferRowData} from "../../util/types";

import ReactMarkdown from "react-markdown";
import {default as SyntaxHighlighter} from "react-syntax-highlighter"
import {vs2015 as style} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {Box, Button, createStyles, makeStyles, Typography} from "@material-ui/core";
import {useLocale} from "../../hooks/locale";
import {FileCopyOutlined} from "@material-ui/icons";

const useStyles = makeStyles(() =>
	createStyles({
		code: {
			'& pre': {
				border: '1px solid rgba(255,255,255,0.2)',
				borderRadius: 8,
			}
		}
	}),
);

export function CodeView(props: {
	show: boolean
	offers?: OfferRowData[]
}) {
	const {show, offers} = props
	const classes = useStyles()
	const {locale} = useLocale()

	const lines = offers?.flatMap(offer => {
		if (offer.items.length === 1)
			return [`${offer.items[0].id} = True\t; ${offer.title}\n`]
		else
			return [`; ${offer.title}\n`].concat(offer.items.filter(item => !item.title).map(item =>
				`${item.id} = True\t; Unknown item from ${offer.title}\n`
			))
	}).reduce((total, current) => total + current, '[DLC_List]\n')

	const md = `~~~ini\n${lines}~~~`

	return (
		<Box style={show ? {} : {display: 'none'}}>
			<Box display={'flex'} alignItems={'center'}>
				<Typography variant={'subtitle1'} children={locale.code_desc}/>
				<Button
					variant={'contained'}
					color={'primary'}
					startIcon={<FileCopyOutlined/>}
					style={{margin: 'auto 0 auto auto'}}
					children={locale.copy}
					onClick={() => navigator.clipboard.writeText(lines ?? '')}
				/>
			</Box>
			<ReactMarkdown children={md} components={{
				code: ({children}) => (
					<SyntaxHighlighter
						style={style}
						language={'ini'}
						PreTag="div"
						showLineNumbers={true}
						children={String(children).replace(/\n$/, '')}
					/>
				)
			}} className={classes.code}/>
		</Box>
	)
}
