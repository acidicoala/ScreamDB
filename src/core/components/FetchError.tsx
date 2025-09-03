import { useLocale } from "~/core/hooks/useLocale";
import { SadFace } from "~/core/components/SadFace.tsx";

export function FetchError() {
  const locale = useLocale();

  return <SadFace>{locale.fetch_failed}</SadFace>;
}
