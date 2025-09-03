import React from "react";
import { Box, Skeleton } from "@mui/material";

export function GameCardSkeleton(props: {
  width: number;
  height: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={props.style}>
      <Skeleton variant="rounded" animation={"pulse"} width={props.width} height={props.height} />
      <Box marginTop={1} />
      <Skeleton variant="text" animation={"wave"} />
      <Skeleton variant="text" animation={"wave"} width={"60%"} />
    </div>
  );
}
