import { useEffect, useState } from "react";
import { SadFace } from "~/core/components/SadFace.tsx";
import { useLocale } from "~/core/hooks/useLocale.ts";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useSearchQuery } from "~/core/hooks/useSearchQuery.ts";
import { CONFIG } from "~/core/env.ts";
import { searchStoreQueryDocument } from "./queries.ts";
import { FetchError } from "~/core/components/FetchError.tsx";
import { useGameFilters } from "./components/GameFilters.tsx";
import { QueryResult } from "~/core/components/ReactQuery.tsx";
import { GameSkeletonGrid } from "~/features/games/components/GameSkeletonGrid.tsx";
import { GameGrid } from "~/features/games/components/GameGrid.tsx";

export function GamesPage() {
  const locale = useLocale();

  const { searchQuery } = useSearchQuery();
  const [currentPage, setCurrentPage] = useState(0);
  const filters = useGameFilters();

  const query = useQuery({
    queryKey: [
      "searchGames",
      searchQuery,
      currentPage,
      filters.sortBy,
      filters.sortDir,
      filters.itemsPerPage,
    ],
    queryFn: async () =>
      request(CONFIG.EPIC_GRAPHQL_ENDPOINT, searchStoreQueryDocument, {
        keywords: searchQuery,
        sortBy: filters.sortBy,
        sortDir: filters.sortDir,
        count: filters.itemsPerPage,
        start: filters.itemsPerPage * currentPage,
      }),
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, filters.sortBy, filters.sortDir, filters.itemsPerPage]);

  return (
    <>
      <title>{locale.browse_games}</title>
      <QueryResult
        query={query}
        loading={() => <GameSkeletonGrid itemsPerPage={filters.itemsPerPage} />}
        error={() => <FetchError />}
        emptyCheck={(data) => data.Catalog.searchStore.elements.length === 0}
        empty={() => <SadFace children={locale.no_games} />}
        success={(data) => (
          <GameGrid
            data={data}
            filtersController={filters}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      />
    </>
  );
}
