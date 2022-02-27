import { useLanguage } from "../context/language";
import { rawLocale } from "../util/locale";

export function useLocale() {
  const { lang } = useLanguage();

  return {
    locale: new Proxy<Record<keyof typeof rawLocale, string>>(
      // @ts-ignore
      rawLocale,
      {
        get(target, name, receiver) {
          let rv = Reflect.get(target, name, receiver);
          if (name in target) rv = rv[lang] ?? rv["en"];
          return rv;
        },
        set(): boolean {
          return false;
        },
      }
    ),
  };
}
