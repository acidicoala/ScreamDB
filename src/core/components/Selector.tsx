import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectorItem<T> {
  value: T;
  text: string;
}

export function Selector<T extends string | number>(props: {
  label: string;
  items: SelectorItem<T>[];
  selected: T;
  onSelect: (item: T) => void;
}) {
  return (
    <FormControl sx={{ minWidth: 120 }} size={"small"}>
      <InputLabel id="label-id">{props.label}</InputLabel>
      <Select
        id="select-id"
        labelId="label-id"
        value={props.selected}
        label={props.label}
        onChange={(e) => {
          props.onSelect(e.target.value as T);
        }}
      >
        {props.items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
