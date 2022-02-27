import { createContext, useContext } from "react";
import { ValidLanguage } from "../util/types";

export const LanguageContext = createContext<{
  lang: ValidLanguage;
  setLang: (key: ValidLanguage) => void;
}>({
  lang: "en",
  setLang: () => {},
});
export const useLanguage = () => useContext(LanguageContext);
