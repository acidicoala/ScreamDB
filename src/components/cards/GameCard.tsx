import {Box, Card} from "@material-ui/core";
import {CSSProperties} from "react";
import {OverflowText} from "../util/OverflowText";


export function GameCard(props: {
	image_url: string
	title: string
	style?: CSSProperties
}) {
	const {image_url, title, style} = props

	return (
		<Box style={{width: 210, ...style}}>
			<Card elevation={3} style={{
				height: 280,
			}}>
				<img src={image_url} alt={title} style={{objectFit: 'cover'}} width={'100%'} height={'100%'}/>
			</Card>
			<Box marginY={1}/>
			<OverflowText style={{lineHeight: '1.3rem', fontSize: '0.9rem'}} children={title}/>
		</Box>
	)
}
