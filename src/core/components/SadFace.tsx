import { Box, Typography } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import type React from "react";

export function SadFace(props: React.PropsWithChildren) {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} margin={4}>
      <SentimentDissatisfied style={{ fontSize: "7rem", color: "rgba(255, 255, 255, 0.5)" }} />
      <Box marginY={1} />
      <Typography variant={"h5"} children={props.children} />
    </Box>
  );
}
