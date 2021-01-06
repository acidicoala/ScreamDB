import {Typography} from "@material-ui/core";
import {useLocale} from "../hooks/locale";
import React from "react";

export function Home(){
	const {locale} = useLocale()

	return (
		<>
			<Typography variant={'h3'}>{locale.home}</Typography>
		</>
	)
}
