import React, { CSSProperties } from "react";
import { Skeleton } from "@material-ui/lab";
import { TableCell, TableRow } from "@material-ui/core";

export function OfferRowSkeleton(props?: { style?: CSSProperties }) {
  return (
    <TableRow style={props?.style}>
      <TableCell />
      <TableCell width={100} height={64}>
        <Skeleton variant="rect" width={88.88} height={50} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
    </TableRow>
  );
}
