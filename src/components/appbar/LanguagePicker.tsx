import {rawLocale} from "../../util/locale";
import {CustomSelect} from "../util/CustomSelect";
import React from "react";
import {useLanguage} from "../../context/language";
import {KeyboardArrowDown, Translate} from "@material-ui/icons";
import {useLocale} from "../../hooks/locale";

export function LanguagePicker() {
	const {setLang} = useLanguage()
	const {locale} = useLocale()

	const languages = [
		{key: 'en', text: rawLocale.lang.en},
		{key: 'ru', text: rawLocale.lang.ru},
	]

	return (
		<CustomSelect
			startIcon={<Translate/>}
			endIcon={<KeyboardArrowDown/>}
			items={languages}
			onItemSelect={item => setLang(item.key)}
			children={locale.lang}
		/>
	)
}
