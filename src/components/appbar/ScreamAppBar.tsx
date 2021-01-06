import React from "react";
import {AppBar, Box, Button, ButtonGroup, Container, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import {maxWidth} from "../../util/storage";
import {path} from "../../util/paths";
import {LanguagePicker} from "./LanguagePicker";
import {useLocale} from "../../hooks/locale";
import {Settings} from "../settings/Settings";
import {ScreamSearchBar} from "./ScreamSearchBar";

export function ScreamAppBar() {
	const {locale} = useLocale()

	const navLinks = [
		[path.to.home, locale.home],
		[path.to.browse, locale.browse],
	]

	return (
		<AppBar position="sticky">
			<Toolbar color="primary">
				<Container maxWidth={maxWidth} >
					<Box display={'flex'} marginY={1}>
						<ButtonGroup variant="text" size={"large"}>{
							navLinks.map(([path, locale]) =>
								<Button component={Link} to={path} children={locale} key={path}/>
							)
						}</ButtonGroup>
						<Box flex={1}/>
						<ScreamSearchBar/>
						<Box marginX={1}/>
						<LanguagePicker/>
						<Settings/>
					</Box>
				</Container>
			</Toolbar>
		</AppBar>
	)
}
