import React, { PropsWithChildren } from "react";
import { Box, BoxProps, Theme, useMediaQuery } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

export function ResponsiveBox(
  props: PropsWithChildren<
    {
      breakpoint: Breakpoint;
    } & BoxProps
  >
) {
  const { breakpoint, children, ...boxProps } = props;
  const responsive = useMediaQuery<Theme>((theme) => theme.breakpoints.down(breakpoint));

  return (
    <Box
      display={"flex"}
      flexDirection={responsive ? "column" : "row"}
      children={children}
      {...boxProps}
    />
  );
}
