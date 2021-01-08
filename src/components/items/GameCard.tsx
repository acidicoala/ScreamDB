import {Box, Card, Typography} from "@material-ui/core";
import {CSSProperties, useState} from "react";
import {OverflowText} from "../util/OverflowText";
import {DisplayItem} from "../../util/types";
import {Link} from "react-router-dom"
import {path} from "../../util/paths";

export function GameCard(props: {
	data: DisplayItem
	mode: 'game' | 'dlc'
	style?: CSSProperties
}) {
	const {data, mode, style} = props
	const [raised, setRaised] = useState(false)

	const image = <img src={data.image_tall}
	                   alt={data.title}
	                   style={{objectFit: 'cover'}}
	                   width={'100%'}
	                   height={'100%'}
	/>

	return (
		<Box style={{width: 210, ...style}}>
			<Card
				raised={raised}
				style={{height: 280}}
				onMouseEnter={() => setRaised(true)}
				onMouseLeave={() => setRaised(false)}
			>
				{
					mode === 'dlc' ? image :
						<Link to={path.to.dlc(data.namespace)}>
							{image}
						</Link>
				}
			</Card>
			<Box marginY={1}/>
			<OverflowText lines={2}
			              style={{lineHeight: '1.3rem', fontSize: '0.9rem', fontWeight: 'bold'}}
			              children={data.title}/>
			{mode === 'dlc' && <Typography children={data.id} style={{overflowWrap: 'anywhere'}}/>}
		</Box>
	)
}
