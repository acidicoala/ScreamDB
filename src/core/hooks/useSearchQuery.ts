import { useSearchParams } from "react-router";

const QUERY_KEY = "q";

export function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    searchQuery: searchParams.get(QUERY_KEY) ?? "",
    setSearchQuery: (query: string) => {
      setSearchParams(query ? { [QUERY_KEY]: query } : undefined);
    },
  };
}
