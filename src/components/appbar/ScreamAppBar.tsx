import React, {useState} from "react";
import {
	AppBar,
	Box,
	Button,
	ButtonGroup,
	Container,
	createStyles, Divider,
	Hidden,
	IconButton,
	makeStyles,
	Toolbar,
	Typography
} from "@material-ui/core";
import {maxWidth} from "../../util/storage";
import {path} from "../../util/paths";
import {useLocale} from "../../hooks/locale";
import {useXS} from "../../hooks/screen-size";
import {ScreamSearchBar} from "./ScreamSearchBar";
import {LanguagePicker} from "./LanguagePicker";
import {Settings} from "../settings/Settings";
import {Link} from "react-router-dom";
import AnimateHeight from "react-animate-height";
import {Menu} from "@material-ui/icons";

const useStyles = makeStyles(({breakpoints}) =>
	createStyles({
		logo: {
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'underline'
			}
		},
		toolbar: {
			padding: 0
		}
	}),
);

export function ScreamAppBar() {
	const {locale} = useLocale()
	const classes = useStyles()
	const xs = useXS()

	const [open, setOpen] = useState(false)

	const NavButtons = () => (
		<ButtonGroup variant="text" size={'large'}>{
			[
				[path.to.browse, locale.browse],
			].map(([path, locale]) =>
				<Button component={Link} to={path} children={locale} key={path}/>
			)
		}</ButtonGroup>
	)

	return (
		<AppBar position={xs ? 'static' : 'sticky'}>
			<Container maxWidth={maxWidth}>
				<Toolbar color="primary" className={classes.toolbar}>
					<Hidden mdUp>
						<IconButton onClick={() => setOpen(!open)} children={<Menu/>}/>
					</Hidden>
					<Typography className={classes.logo}
					            variant={'h5'}
					            children={'ScreamDB'}
					            color={'secondary'}
					            component={Link}
					            to={path.to.home}
					/>
					<Box marginX={1}/>
					<Hidden xsDown children={<NavButtons/>}/>
					<Box marginX={1}/>
					<Hidden mdDown children={<ScreamSearchBar/>}/>
					<Box flex={1}/>
					<Box marginX={1}/>
					<LanguagePicker/>
					{/* <Settings/> */}{/* Reserved for future use*/}
				</Toolbar>
				<Hidden mdUp>
					<AnimateHeight duration={250} height={open ? 'auto' : 0}>
						<Divider/>
						<Toolbar>
							<Box paddingLeft={4} width={'100%'} paddingY={1}>
								<ScreamSearchBar/>
								<Box marginY={1}/>
								<Hidden smUp children={<NavButtons/>}/>
							</Box>
						</Toolbar>
					</AnimateHeight>
				</Hidden>
			</Container>
		</AppBar>
	)
}
