import type { KeyImage } from "~/core/gql/graphql.ts";
import { useMemo } from "react";
import { getResizedImageUrl } from "~/core/utils/resize.ts";
import { Box, ButtonBase } from "@mui/material";
import { Img } from "react-image";
import ImageZoom from "react-medium-image-zoom";

import { gameOffersUtils } from "~/features/game-offers/utils/game-offers-utils.ts";

export function ThumbnailImage({ keyImages }: { keyImages?: KeyImage[] | null }) {
  const imageUrl = useMemo(() => keyImages && gameOffersUtils(keyImages)?.url, [keyImages]);
  const resizedImageUrl = useMemo(
    () => imageUrl && getResizedImageUrl({ url: imageUrl, w: 256, h: 144, q: "medium" }),
    [imageUrl],
  );

  return (
    <Box display={"flex"} justifyContent={"center"} width={"100%"} height={40}>
      <Img
        src={resizedImageUrl ?? ""}
        height={40}
        container={(children) => (
          <ImageZoom isDisabled={!imageUrl} zoomImg={{ src: imageUrl ?? "" }}>
            <ButtonBase>{children}</ButtonBase>
          </ImageZoom>
        )}
      />
    </Box>
  );
}
