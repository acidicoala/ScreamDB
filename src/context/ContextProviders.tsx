import { PropsWithChildren, useState } from "react";
import { LanguageContext } from "./language";
import { KeywordsContext } from "./keywords";
import { readProp, writeProp } from "../util/storage";
import { ValidLanguage } from "../util/types";

export function ContextProviders(props: PropsWithChildren<{}>) {
  let storedLang = readProp("lang", "en");
  if (!["en", "es", "ru", "zh"].includes(storedLang)) {
    storedLang = "en";
    writeProp("lang", "en");
  }

  const [language, setLanguage] = useState<ValidLanguage>(storedLang as ValidLanguage);
  const langValue = {
    lang: language,
    setLang: (key: ValidLanguage) => {
      setLanguage(key);
      writeProp("lang", key);
    },
  };

  const [keywords, setKeywords] = useState("");
  const keywordsValue = {
    keywords: keywords,
    setKeywords: setKeywords,
  };

  return (
    <LanguageContext.Provider value={langValue}>
      <KeywordsContext.Provider value={keywordsValue}>{props.children}</KeywordsContext.Provider>
    </LanguageContext.Provider>
  );
}
