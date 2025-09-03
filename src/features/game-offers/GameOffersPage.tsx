import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useParams } from "react-router";
import { CONFIG } from "~/core/env.ts";
import { searchGameOffersQueryDocument } from "./queries.ts";
import { useLocale } from "~/core/hooks/useLocale.ts";
import { Box } from "@mui/material";
import { type SearchGameOffersQuery } from "~/core/gql/graphql.ts";
import { FetchError } from "~/core/components/FetchError.tsx";
import { LoadingFallback } from "~/core/components/LoadingFallback.tsx";
import { QueryResult } from "~/core/components/ReactQuery.tsx";
import { GameOffersTable } from "~/features/game-offers/components/GameOffersTable.tsx";
import { GameOffersBanner } from "~/features/game-offers/components/GameOffersBanner.tsx";
import { GameOffersInfo } from "~/features/game-offers/components/GameOffersInfo.tsx";

export type OfferElement = SearchGameOffersQuery["Catalog"]["catalogOffers"]["elements"][number];

/**
 * TODO: Show if a DLC needs to download extra files
 */
export function GameOffersPage() {
  const locale = useLocale();
  const params = useParams();
  const namespace = params.namespace ?? "";

  const query = useQuery({
    queryKey: ["searchGames", namespace],
    queryFn: async () =>
      request(CONFIG.EPIC_GRAPHQL_ENDPOINT, searchGameOffersQueryDocument, {
        namespace: namespace,
      }),
  });

  return (
    <>
      <title>{locale.game_offers}</title>
      <QueryResult
        query={query}
        loading={() => <LoadingFallback />}
        error={() => <FetchError />}
        success={(data) => <GameOffersContent data={data} />}
      />
    </>
  );
}

function GameOffersContent(props: { data: SearchGameOffersQuery }) {
  const { catalogOffers, searchStore } = props.data.Catalog;
  const gameData = searchStore.elements[0];

  return (
    <>
      <title>{gameData.title}</title>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          alignItems: {
            "@": "center",
            "@sm": "flex-start",
          },
          flexDirection: {
            "@": "column",
            "@sm": "row",
          },
        }}
      >
        <GameOffersBanner gameData={gameData} />
        <Box maxWidth={512}>
          <GameOffersInfo gameData={gameData} />
        </Box>
      </Box>

      <GameOffersTable elements={catalogOffers.elements} />
    </>
  );
}
