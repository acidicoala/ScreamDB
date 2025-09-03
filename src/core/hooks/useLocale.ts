import { LOCALE_EN } from "~/core/locale.ts";

export function useLocale() {
  return LOCALE_EN;
}

export type Locale = ReturnType<typeof useLocale>;
