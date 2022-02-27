import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { bindMenu, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { Key } from "react";

export function CustomSelect<T extends { key: Key | boolean; text: string; color?: string }>(
  props: {
    menuItemClassName?: string;
    items?: Array<T>;
    onItemSelect?: (item: T) => void;
  } & ButtonProps
) {
  const { menuItemClassName, items, onItemSelect, ...buttonProps } = props;
  const popupState = usePopupState({ variant: "popover", popupId: null });

  return (
    <>
      <Button {...buttonProps} {...bindTrigger(popupState)}></Button>
      <Menu {...bindMenu(popupState)} keepMounted={true}>
        {items?.map((item) => (
          <MenuItem
            key={item.key.toString()}
            className={menuItemClassName}
            dense={false}
            style={{ color: item.color, height: 48 }}
            onClick={() => {
              popupState.close();
              onItemSelect?.(item);
            }}
          >
            <Typography align={"center"} style={{ flex: 1 }}>
              {item.text}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
