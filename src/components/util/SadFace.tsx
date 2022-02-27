import { Box, Typography } from "@material-ui/core";
import { SentimentDissatisfied } from "@material-ui/icons";
import { PropsWithChildren } from "react";

export function SadFace(props: PropsWithChildren<{}>) {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} margin={4}>
      <SentimentDissatisfied style={{ fontSize: "7rem", color: "rgba(255, 255, 255, 0.5)" }} />
      <Box marginY={1} />
      <Typography variant={"h5"} children={props.children} />
    </Box>
  );
}
