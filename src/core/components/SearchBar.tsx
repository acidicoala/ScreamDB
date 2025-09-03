import { useEffect, useState } from "react";
import { Divider, IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import { ArrowForward, Clear, Search } from "@mui/icons-material";
import { useLocale } from "~/core/hooks/useLocale.ts";

export function SearchBar(props: {
  placeholder: string;
  onClear?: (query: "") => void;
  onSearch: (query: string) => void;
  initial?: string;
}) {
  const locale = useLocale();
  const { placeholder, onClear, onSearch } = props;
  const [queryInput, setQueryInput] = useState(props.initial ?? "");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (props.initial !== undefined) {
      setQueryInput(props.initial);
    }
  }, [props.initial]);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: focused ? "rgba(0,0,0,40%)" : "rgba(0,0,0,20%)",
        transition: "background-color 100ms ease-in",
      }}
    >
      <Search fontSize="small" sx={{ margin: 1 }} />

      {/*We wrap in <form/> to scope the id of InputBase*/}
      <form onSubmit={(e) => e.preventDefault()}>
        <InputBase
          id={"search"}
          value={queryInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => setQueryInput(event.target.value)}
          placeholder={placeholder}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSearch(queryInput);
            }
          }}
        />
      </form>

      <IconButton
        disabled={queryInput.length === 0}
        onClick={() => {
          onClear?.("");
        }}
      >
        <Tooltip title={locale.clear_all}>
          <Clear fontSize={"small"} />
        </Tooltip>
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ marginY: 1 }} />
      <IconButton
        sx={{ padding: 1, fontSize: "2.5rem" }}
        onClick={() => {
          onSearch(queryInput);
        }}
      >
        <Tooltip title={locale.search_games}>
          <ArrowForward fontSize={"small"} />
        </Tooltip>
      </IconButton>
    </Paper>
  );
}
