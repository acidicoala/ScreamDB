import { Link as RouterLink } from "react-router";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  Divider,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import ImageZoom from "react-medium-image-zoom";
import EGSIcon from "~/assets/epic_games_logo.svg?react";
import egdataLogoUrl from "~/assets/egdata_logo.png?url";
import { Img } from "react-image";
import { ImageFallback } from "~/core/components/ImageFallback.tsx";
import { useLocale } from "~/core/hooks/useLocale";
import { getResizedImageUrl } from "~/core/utils/resize.ts";
import type { KeyImage } from "~/core/gql/graphql.ts";
import type { GameData } from "~/features/game-offers/queries.ts";
import { gameOffersUtils } from "~/features/game-offers/utils/game-offers-utils.ts";

export const BANNER_WIDTH = 320;
export const BANNER_HEIGHT = 180;

export function GameOffersBanner({ gameData }: { gameData: GameData }) {
  return (
    <Card sx={{ minWidth: BANNER_WIDTH, maxWidth: BANNER_WIDTH }}>
      {/* Wrapper with fixed height to avoid layout CLS */}
      <Box sx={{ height: BANNER_HEIGHT }}>
        <BannerImage keyImages={gameData.keyImages} />
      </Box>

      <Divider />

      <BannerLinks gameData={gameData} />
    </Card>
  );
}

function BannerImage(props: { keyImages: KeyImage[] | null | undefined }) {
  const bannerUrl = props.keyImages && gameOffersUtils(props.keyImages)?.url;

  const resizedBannerUrl =
    bannerUrl &&
    getResizedImageUrl({
      url: bannerUrl,
      w: 2 * BANNER_WIDTH,
      h: 2 * BANNER_HEIGHT,
    });

  return (
    <Img
      width={"100%"}
      src={resizedBannerUrl ?? ""}
      style={{ objectFit: "cover" }}
      container={(children) => (
        <ImageZoom isDisabled={!bannerUrl} zoomImg={{ src: bannerUrl ?? undefined }}>
          <ButtonBase>{children}</ButtonBase>
        </ImageZoom>
      )}
      unloader={<ImageFallback />}
      unloaderContainer={(children) => (
        <Box height={BANNER_HEIGHT} display={"flex"} alignItems={"center"}>
          {children}
        </Box>
      )}
    />
  );
}

function BannerLinks({ gameData }: { gameData: GameData }) {
  const locale = useLocale();

  const egsPage =
    "https://www.epicgames.com/store/product/" + gameData.catalogNs.mappings[0].pageSlug;
  const egdataPage = `https://egdata.app/offers/${gameData.id}`;

  return (
    <CardActions>
      <Tooltip title={locale.store_tooltip}>
        <Button
          size={"small"}
          color={"secondary"}
          variant={"contained"}
          startIcon={<SvgIcon component={EGSIcon} inheritViewBox />}
          component={RouterLink}
          to={egsPage}
          target={"_blank"}
        >
          {locale.store}
        </Button>
      </Tooltip>
      <Tooltip title={locale.egdata_tooltip}>
        <Button
          size={"small"}
          color={"secondary"}
          variant={"outlined"}
          startIcon={<img src={egdataLogoUrl} width={24} height={24} alt="" />}
          component={RouterLink}
          to={egdataPage}
          target={"_blank"}
        >
          {locale.egdata}
        </Button>
      </Tooltip>
    </CardActions>
  );
}
