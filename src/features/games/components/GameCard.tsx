import { Box, ButtonBase, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router";
import Tilt from "react-parallax-tilt";
import { routes } from "~/core/routes.tsx";
import { Img } from "react-image";
import { ImageFallback } from "~/core/components/ImageFallback.tsx";

export const GAME_CARD_WIDTH = 192;
export const GAME_CARD_HEIGHT = 256;

export interface GameCardData {
  id: string;
  title: string;
  namespace: string;
  imageUrl: string | undefined;
  creationDate: Date;
}

export function GameCard(props: {
  data: GameCardData;
  width: number;
  height: number;
  style?: React.CSSProperties;
}) {
  const { data, style } = props;

  const [raised, setRaised] = useState(false);
  return (
    <Box style={{ width: props.width, ...style }}>
      <Tilt
        onEnter={() => setRaised(true)}
        onLeave={() => setRaised(false)}
        glareEnable={true}
        glareColor="white"
        glareMaxOpacity={0.1}
        glarePosition="all"
        glareReverse={true}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareBorderRadius="4px" // Has to match Card's corner radius
      >
        <Card raised={raised} style={{ height: props.height, display: "flex" }}>
          <ButtonBase
            component={RouterLink}
            to={routes.gameOffers(data.namespace)}
            sx={{ flex: 1 }}
          >
            <Img
              src={data.imageUrl ?? ""}
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
              unloader={<ImageFallback />}
            />
          </ButtonBase>
        </Card>
      </Tilt>
      <Box marginY={1} />
      <Typography fontWeight={"bold"} variant={"body1"}>
        {data.title}
      </Typography>
    </Box>
  );
}
