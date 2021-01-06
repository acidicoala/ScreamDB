import {PropsWithChildren, useState} from "react";
import {LanguageContext} from "./language";
import {readProp, writeProp} from "../util/storage";

export function ContextProviders(props: PropsWithChildren<{}>) {
	const [language, setLanguage] = useState(readProp('lang', 'en'));

	const value = {
		lang: language,
		setLang: (key: string) => {
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
