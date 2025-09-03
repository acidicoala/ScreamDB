import { type ContainerOwnProps, createTheme } from "@mui/material";

import "@fontsource-variable/outfit/index.css";
import "@fontsource-variable/fira-code/index.css";
import "react-medium-image-zoom/dist/styles.css";
import "../index.css";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#222",
    },
    primary: {
      main: "#41c647",
      contrastText: "#DDD",
    },
    secondary: {
      main: "#FFF",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTableRow: {
      // Remove the bottom border of a last table row.
      // Source: https://github.com/mui/material-ui/issues/14073#issuecomment-464464566
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '"Outfit Variable"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

// A workaround for not importing @mui/system directly
type Breakpoint = Exclude<ContainerOwnProps["maxWidth"], undefined | false>;

export const MAX_WIDTH_BREAKPOINT: Breakpoint = "lg";
