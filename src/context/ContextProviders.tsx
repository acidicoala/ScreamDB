import {PropsWithChildren, useState} from "react";
import {LanguageContext} from "./language";
import {readProp, writeProp} from "../util/storage";
import {ValidLanguage} from "../util/types";

export function ContextProviders(props: PropsWithChildren<{}>) {
	let storedLang = readProp('lang', 'en')
	if (!['en', 'ru'].includes(storedLang))
		storedLang = 'en'
	const [language, setLanguage] = useState<ValidLanguage>(storedLang as ValidLanguage);

	const value = {
		lang: language,
		setLang: (key: ValidLanguage) => {
			setLanguage(key);
			writeProp('lang', key);
		}
	}

	return (
		<LanguageContext.Provider value={value}>
			{props.children}
		</LanguageContext.Provider>
	)
}
