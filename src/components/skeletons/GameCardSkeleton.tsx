import React, { CSSProperties } from "react";
import { Skeleton } from "@material-ui/lab";
import { Box } from "@material-ui/core";

export function GameCardSkeleton(props?: { style?: CSSProperties }) {
  return (
    <div style={props?.style}>
      <Skeleton variant="rect" width={210} height={280} style={{ borderRadius: 4 }} />
      <Box marginTop={1} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width={"60%"} />
    </div>
  );
}
