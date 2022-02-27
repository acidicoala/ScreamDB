export function writeProp(key: LocalStorageProps, value: any) {
  localStorage.setItem(key, value);
}

export function readProp(key: LocalStorageProps, defaultValue: string) {
  let property = localStorage.getItem(key);
  if (!property) {
    property = defaultValue;
    writeProp(key, defaultValue);
  }
  return property;
}

export const maxWidth = "lg";

export type LocalStorageProps =
  | "item_per_page"
  | "lang"
  | "sort_games_by"
  | "sort_games_dir"
  | "type_filters";
