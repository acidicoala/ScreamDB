import React, { CSSProperties, useState } from "react";
import { createStyles, Divider, IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import { ArrowForward, Clear, Search } from "@material-ui/icons";

const useStyles = makeStyles(({ breakpoints, spacing }) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      background: "rgb(0,0,0,0.2)",
      boxShadow: "none",
      width: "100%",
      maxWidth: spacing(50),
      [breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
    },
    input: {
      marginLeft: spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: spacing(1),
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export function SearchBar(props: {
  placeholder: string;
  onClear?: (query: "") => void;
  onSearch: (query: string) => void;
  style?: CSSProperties;
}) {
  const { placeholder, onClear, onSearch, style } = props;
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Paper component="form" className={classes.root} style={style}>
      <Search className={classes.iconButton} fontSize={"inherit"} style={{ fontSize: "2.5rem" }} />
      <InputBase
        className={classes.input}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder={placeholder}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            onSearch(searchQuery);
            event.preventDefault();
          }
        }}
      />
      <IconButton
        className={classes.iconButton}
        disabled={searchQuery.length === 0}
        onClick={() => {
          onClear?.("");
          setSearchQuery("");
        }}
      >
        <Clear />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} onClick={() => onSearch(searchQuery)}>
        <ArrowForward />
      </IconButton>
    </Paper>
  );
}
