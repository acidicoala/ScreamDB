import React, { PropsWithChildren } from "react";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    body: {
      [breakpoints.up("sm")]: {
        overflowY: "scroll",
        height: `calc(100vh - 64px)`,
      },
    },
  })
);

export function OverflowBody(props: PropsWithChildren<{}>) {
  const { body } = useStyles();
  return <div className={body} children={props.children} />;
}
