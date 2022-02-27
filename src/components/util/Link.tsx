import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      color: "white",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

export function ScreamLink<S>(props: LinkProps<S>) {
  const { link } = useStyles();
  return <Link className={link} {...props} />;
}
