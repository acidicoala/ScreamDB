import {rawLocale} from "../../util/locale";
import {CustomSelect} from "../util/CustomSelect";
import React from "react";
import {useLanguage} from "../../context/language";
import {KeyboardArrowDown, Translate} from "@material-ui/icons";
import {useLocale} from "../../hooks/locale";
import {useXS} from "../../hooks/screen-size";
import {ValidLanguage} from "../../util/types";

export function LanguagePicker() {
	const {setLang} = useLanguage()
	const {locale} = useLocale()
	const xs = useXS()

	const languages = [
		{key: 'en', text: rawLocale.lang.en},
		{key: 'es', text: rawLocale.lang.es},
		{key: 'ru', text: rawLocale.lang.ru},
		{key: 'zh', text: rawLocale.lang.zh},
	]

	return (
		<CustomSelect
			size={'large'}
			startIcon={<Translate/>}
			endIcon={<KeyboardArrowDown/>}
			items={languages}
			onItemSelect={item => setLang(item.key as ValidLanguage)}
			children={!xs && locale.lang}
		/>
	)
}
