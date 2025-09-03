import { Box, Skeleton, Typography } from "@mui/material";
import { GameGridBox } from "~/features/games/components/GameGridBox.tsx";
import { GameCardSkeleton } from "~/features/games/components/GameCardSkeleton.tsx";
import { GAME_CARD_HEIGHT, GAME_CARD_WIDTH } from "~/features/games/components/GameCard.tsx";
import { Selector } from "~/core/components/Selector.tsx";

export function GameSkeletonGrid(props: { itemsPerPage: number }) {
  const dummySelector = (
    <Skeleton>
      <Selector label={""} items={[]} selected={""} onSelect={() => undefined} />
    </Skeleton>
  );

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      {/*For some reason to match h5 text height we have to use h3 skeleton...*/}
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"h5"}>
          <Skeleton animation={"wave"} width={200} />
        </Typography>
        <Box display={"flex"} gap={2}>
          {dummySelector}
          {dummySelector}
          {dummySelector}
        </Box>
      </Box>

      <GameGridBox>
        {[...Array(props.itemsPerPage).keys()].map((it) => (
          <GameCardSkeleton key={it} width={GAME_CARD_WIDTH} height={GAME_CARD_HEIGHT} />
        ))}
      </GameGridBox>
    </Box>
  );
}
