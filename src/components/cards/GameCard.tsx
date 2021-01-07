import {Box, Card} from "@material-ui/core";
import {CSSProperties} from "react";
import {OverflowText} from "../util/OverflowText";
import {GameItem} from "../../util/types";


export function GameCard(props: {
	data: GameItem
	style?: CSSProperties
}) {
	const {data, style} = props

	return (
		<Box style={{width: 210, ...style}}>
			<Card elevation={3} style={{
				height: 280,
			}}>
				<img src={data.image_url}
				     alt={data.title}
				     style={{objectFit: 'cover'}}
				     width={'100%'}
				     height={'100%'}
				/>
			</Card>
			<Box marginY={1}/>
			<OverflowText lines={2}
			              style={{lineHeight: '1.3rem', fontSize: '0.9rem'}}
			              children={data.title}/>
		</Box>
	)
}
