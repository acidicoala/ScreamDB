import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useLocale } from "../../hooks/locale";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { ValidSortDirection } from "../../util/types";
import { writeProp } from "../../util/storage";

export function SortDirButton(props: {
  sortDir: ValidSortDirection;
  setSortDir: (dir: ValidSortDirection) => void;
}) {
  const { sortDir, setSortDir } = props;
  const [isAscending, setIsAscending] = useState(sortDir === "ASC");
  const { locale } = useLocale();

  return (
    <Button
      size={"large"}
      endIcon={isAscending ? <ArrowUpward /> : <ArrowDownward />}
      children={isAscending ? locale.ascending : locale.descending}
      onClick={() => {
        const newDirection = isAscending ? "DESC" : "ASC";
        setSortDir(newDirection);
        writeProp("sort_games_dir", newDirection);
        setIsAscending(!isAscending);
      }}
    />
  );
}
