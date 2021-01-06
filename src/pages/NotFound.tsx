import {Typography} from "@material-ui/core";
import {useLocale} from "../hooks/locale";

export function NotFound() {
	const {locale} = useLocale()

	return (
		<Typography variant={'h3'}>{locale.not_found}</Typography>
	)
}
