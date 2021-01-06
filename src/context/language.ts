import {createContext, useContext} from "react";

export const LanguageContext = createContext<{ lang: string, setLang: (key: string) => void }>({
	lang: 'en', setLang: () => {}
});
export const useLanguage = () => useContext(LanguageContext);
