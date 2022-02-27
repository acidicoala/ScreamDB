import React, { useState } from "react";
import {
  Box,
  createStyles,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { useLocale } from "../../hooks/locale";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(({ breakpoints, spacing }) =>
  createStyles({
    settings: {
      width: "100%",
      maxWidth: "100%",
      [breakpoints.up("sm")]: {
        maxWidth: spacing(45),
      },
    },
  })
);

export function Settings() {
  const { settings } = useStyles();
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <SettingsIcon />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={open}
        classes={{
          paper: settings,
        }}
        onClose={() => setOpen(false)}
      >
        <>
          <Box display={"flex"} justifyContent={"space-between"} margin={2}>
            <Typography
              variant={"h4"}
              children={locale.settings}
              style={{
                marginTop: "auto",
                marginBottom: "auto",
              }}
            />
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <Divider />
        </>
      </Drawer>
    </>
  );
}
