import React from "react";
import {Route, Switch,} from "react-router-dom";
import {path} from "../../util/paths";
import {Home} from "../../pages/Home";
import {Browse} from "../../pages/Browse";
import {SadFace} from "../util/SadFace";
import {useLocale} from "../../hooks/locale";

export function ScreamSwitch() {
	const {locale} = useLocale()

	const paths: [string | string[] | undefined, JSX.Element, boolean][] = [
		[path.to.home, <Home/>, true],
		[[path.to.games, path.to.dlc(':namespace')], <Browse/>, false],
		[undefined, <SadFace children={locale.not_found}/>, false]
	]

	return (
		<Switch>
			{paths.map(([path, page, exact], index) =>
				<Route exact={exact} path={path} children={page} key={index}/>
			)}
		</Switch>
	)
}
