import React from "react";
import {Route, Switch,} from "react-router-dom";
import {path} from "../../util/paths";
import {Home} from "../../pages/Home";
import {Browse} from "../../pages/browse/Browse";
import {NotFound} from "../../pages/NotFound";

export function ScreamSwitch() {
	const paths: [string, JSX.Element][] = [
		[path.to.home, <Home/>],
		[path.to.browse, <Browse/>],
	]

	return (

		<Switch>
			{paths.map(([path, page]) =>
				<Route exact path={path} children={page} key={path}/>
			)}
			<Route children={<NotFound/>}/>
		</Switch>
	)
}
