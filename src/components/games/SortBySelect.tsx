import React from "react";
import { KeyboardArrowDown } from "@material-ui/icons";
import { CustomSelect } from "../util/CustomSelect";
import { useLocale } from "../../hooks/locale";
import { writeProp } from "../../util/storage";

export enum SortOption {
  RELEVANCE = "",
  TITLE = "title",
  CREATION_DATE = "creationDate",
  RELEASE_DATE = "releaseDate",
  PC_RELEASE_DATE = "pcReleaseDate",
  CURRENT_PRICE = "currentPrice",
}

export function SortBySelect(props: {
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
}) {
  const { locale } = useLocale();
  const { sortBy, setSortBy } = props;

  const sortOptions = [
    { key: SortOption.RELEVANCE, text: locale.sort_relevance },
    { key: SortOption.TITLE, text: locale.sort_title },
    { key: SortOption.CREATION_DATE, text: locale.sort_creation_date },
    { key: SortOption.RELEASE_DATE, text: locale.sort_new_release },
    { key: SortOption.PC_RELEASE_DATE, text: locale.sort_release_date },
    { key: SortOption.CURRENT_PRICE, text: locale.sort_current_price },
  ];

  return (
    <CustomSelect
      size={"large"}
      style={{ textTransform: "none" }}
      variant={"outlined"}
      endIcon={<KeyboardArrowDown />}
      items={sortOptions}
      onItemSelect={(item) => {
        setSortBy(item.key);
        writeProp("sort_games_by", item.key);
      }}
      children={sortOptions.find((it) => it.key === sortBy)?.text}
    />
  );
}
