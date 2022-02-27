import { Container, createStyles, makeStyles } from "@material-ui/core";
import { ReactNode } from "react";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    container: {
      // margin: 'auto',
      width: "100%",
      maxWidth: "100%",
      [breakpoints.up("sm")]: {
        maxWidth: breakpoints.values.sm,
      },
      [breakpoints.up("md")]: {
        maxWidth: breakpoints.values.md,
      },
      [breakpoints.up("lg")]: {
        maxWidth: breakpoints.values.lg,
      },
    },
  })
);

export function ResponsiveContainer(props: { children: ReactNode }) {
  const classes = useStyles();
  return <Container className={classes.container} children={<>{props.children}</>} />;
}
