import { KeyImageType, type SearchStoreQuery } from "~/core/gql/graphql.ts";
import {
  GameFilters,
  type GameFiltersController,
} from "~/features/games/components/GameFilters.tsx";
import { useLocale } from "~/core/hooks/useLocale.ts";
import { useMemo } from "react";
import {
  GAME_CARD_HEIGHT,
  GAME_CARD_WIDTH,
  GameCard,
  type GameCardData,
} from "~/features/games/components/GameCard.tsx";
import { getResizedImageUrl } from "~/core/utils/resize.ts";
import { Box, Pagination, Typography } from "@mui/material";
import { GameGridBox } from "~/features/games/components/GameGridBox.tsx";

export function GameGrid(props: {
  data: SearchStoreQuery;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  filtersController: GameFiltersController;
}) {
  const locale = useLocale();

  const { searchStore } = props.data.Catalog;
  const { total } = searchStore.paging;

  const foundGames = `${locale.found_games}: ${total.toString()}`;
  const paginationCount = Math.round(total / props.filtersController.itemsPerPage);

  const games = useMemo(
    () =>
      searchStore.elements.map<GameCardData>((element) => {
        const imageUrl = element.keyImages //
          ?.find((img) => img.type === KeyImageType.OfferImageTall)?.url;

        const resizedImageUrl =
          imageUrl && getResizedImageUrl({ url: imageUrl, w: 360, h: 480, q: "medium" });

        return {
          id: element.id,
          title: element.title,
          namespace: element.namespace,
          imageUrl: resizedImageUrl,
          creationDate: new Date(element.creationDate),
        };
      }),
    [searchStore],
  );

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"h5"}>{foundGames}</Typography>
        <GameFilters controller={props.filtersController} />
      </Box>

      <GameGridBox>
        {games.map((it) => (
          <GameCard key={it.id} data={it} width={GAME_CARD_WIDTH} height={GAME_CARD_HEIGHT} />
        ))}
      </GameGridBox>

      <Box display={"flex"} justifyContent={"center"}>
        <Pagination
          shape="rounded"
          variant={"outlined"}
          count={paginationCount}
          page={props.currentPage + 1}
          onChange={(_e, value) => {
            props.setCurrentPage(Math.max(0, value - 1));
          }}
        />
      </Box>
    </Box>
  );
}
