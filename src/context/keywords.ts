import { createContext, useContext } from "react";

export const KeywordsContext = createContext<{
  keywords: string;
  setKeywords: (key: string) => void;
}>({
  keywords: "",
  setKeywords: () => {},
});
export const useKeywords = () => useContext(KeywordsContext);
