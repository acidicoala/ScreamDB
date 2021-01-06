import {CSSProperties, PropsWithChildren} from "react";
import {createStyles, makeStyles} from "@material-ui/core";


const useStyles = makeStyles(() =>
	createStyles({
		text: {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			display: '-webkit-box',
			'-webkit-line-clamp': 2,
			'-webkit-box-orient': 'vertical'
		},
	}),
);

export function OverflowText(props: PropsWithChildren<{ style: CSSProperties }>) {
	const {text} = useStyles()

	return <div className={text} style={props.style}>{props.children}</div>
}
