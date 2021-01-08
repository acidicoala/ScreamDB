import React from "react"
import {DisplayItem} from "../../util/types";
import ReactMarkdown from "react-markdown";
import {default as SyntaxHighlighter} from "react-syntax-highlighter"
import {vs2015 as style} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {Box, Button, createStyles, makeStyles, Typography} from "@material-ui/core";
import {useLocale} from "../../hooks/locale";
import {FileCopyOutlined} from "@material-ui/icons";

const useStyles = makeStyles(() =>
	createStyles({
		code: {
			'& pre' :{
				border: '1px solid rgba(255,255,255,0.2)',
				borderRadius: 8,
			}
		}
	}),
);

export function CodeView(props: {
	items?: DisplayItem[]
}) {
	const {items} = props
	const classes = useStyles()
	const {locale} = useLocale()

	const lines = items?.reduce((lines, item) =>
		`${lines}\n${item.id} = True\t; ${item.title}`, '[DLC_List]'
	)
	const md = `~~~ini\n${lines}\n~~~`

	return (
		<>
			<Box display={'flex'} marginTop={4}>
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
			<ReactMarkdown source={md} renderers={{
				code: ({language, value}) =>
					<SyntaxHighlighter style={style}
					                   language={language}
					                   children={value}
					                   showLineNumbers={true}/>
			}} className={classes.code}/>
		</>
	)
}
