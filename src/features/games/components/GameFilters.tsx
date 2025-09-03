import { useMemo, useState } from "react";
import { useLocale } from "~/core/hooks/useLocale.ts";
import { Selector } from "~/core/components/Selector.tsx";
import { Box } from "@mui/material";

/** Endpoint won't return more than 40 */
const PAGE_ITEM_COUNT_OPTIONS = [5, 10, 20, 40];

enum SortDirection {
  Ascending = "ASC",
  Descending = "DESC",
}

enum SortBy {
  Relevancy = "relevancy",
  Title = "title",
  CreationDate = "creationDate",
  ReleaseDate = "releaseDate",
  PCReleaseDate = "pcReleaseDate",
  CurrentPrice = "currentPrice",
}

export function useGameFilters() {
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_ITEM_COUNT_OPTIONS[1]);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.CreationDate);
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.Descending);

  return {
    itemsPerPage,
    setItemsPerPage,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
  };
}

export type GameFiltersController = ReturnType<typeof useGameFilters>;

export function GameFilters({ controller }: { controller: GameFiltersController }) {
  const locale = useLocale();

  const sortBySelectorItems = useMemo(
    () =>
      Object.keys(SortBy).map((key) => {
        const value = SortBy[key as keyof typeof SortBy];
        const text = {
          [SortBy.Relevancy]: locale.sort_relevancy,
          [SortBy.Title]: locale.sort_title,
          [SortBy.CreationDate]: locale.sort_creation_date,
          [SortBy.ReleaseDate]: locale.sort_release_date,
          [SortBy.PCReleaseDate]: locale.sort_release_date,
          [SortBy.CurrentPrice]: locale.sort_current_price,
        }[value];

        return { value, text };
      }),
    [locale],
  );

  const sortDirSelectorItems = useMemo(
    () =>
      Object.keys(SortDirection).map((key) => {
        const value = SortDirection[key as keyof typeof SortDirection];
        const text = {
          [SortDirection.Ascending]: locale.ascending,
          [SortDirection.Descending]: locale.descending,
        }[value];

        return { value, text };
      }),
    [locale],
  );

  return (
    <Box display={"flex"} gap={1}>
      <Selector
        label={locale.sort_by}
        items={sortBySelectorItems}
        selected={controller.sortBy}
        onSelect={controller.setSortBy}
      />

      <Selector
        label={locale.order}
        items={sortDirSelectorItems}
        selected={controller.sortDir}
        onSelect={controller.setSortDir}
      />

      <Selector
        label={locale.games_per_page}
        items={PAGE_ITEM_COUNT_OPTIONS.map((it) => ({ value: it, text: it.toString() }))}
        selected={controller.itemsPerPage}
        onSelect={controller.setItemsPerPage}
      />
    </Box>
  );
}
