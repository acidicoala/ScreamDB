import { Outlet } from "react-router";
import { Box, Container, Divider, IconButton, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { MainAppBar } from "./components/MainAppBar.tsx";
import { useLayoutEffect, useRef, useState } from "react";
import { MainAppFooter } from "./components/MainAppFooter.tsx";
import { appTheme, MAX_WIDTH_BREAKPOINT } from "~/core/theme.ts";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { Close } from "@mui/icons-material";
import { AppQueryClientProvider } from "~/core/components/ReactQuery.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { PageCrash } from "~/core/components/PageCrash.tsx";

export function App() {
  const appBarRef = useRef<HTMLElement>(null);
  const [appBarHeight, setAppBarHeight] = useState(0);

  useLayoutEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.offsetHeight);
    }
  }, []);

  return (
    <AppQueryClientProvider>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider
          autoHideDuration={2000}
          action={(snackbarId) => (
            <IconButton size={"small"} onClick={() => closeSnackbar(snackbarId)}>
              <Close />
            </IconButton>
          )}
        >
          <CssBaseline />
          <MainAppBar ref={appBarRef} />
          <Box
            height={`calc(100vh - ${appBarHeight.toString()}px)`}
            display={"flex"}
            flexDirection={"column"}
            sx={{ overflowY: "scroll" }}
          >
            <Container
              maxWidth={MAX_WIDTH_BREAKPOINT}
              sx={{
                flex: 1,
                paddingY: 2,
                containerType: "inline-size", // To support MUI container queries
              }}
            >
              <ErrorBoundary fallback={<PageCrash />}>
                <Outlet />
              </ErrorBoundary>
            </Container>
            <Divider />
            <MainAppFooter />
          </Box>
        </SnackbarProvider>
      </ThemeProvider>
    </AppQueryClientProvider>
  );
}
