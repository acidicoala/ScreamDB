import React from "react";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeOptions,
  ThemeProvider,
} from "@material-ui/core";
import { ScreamAppBar } from "./components/appbar/ScreamAppBar";
import { ScreamSwitch } from "./components/router/ScreamSwitch";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProviders } from "./context/ContextProviders";
import { OverflowBody } from "./components/util/OverflowBody";
import { ResponsiveContainer } from "./components/util/ResponsiveContainer";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#2e7d32",
        contrastText: "#FFF",
      },
      secondary: {
        main: "#FFF",
      },
      background: {
        default: "#2F2F2F",
      },
    },
  } as ThemeOptions)
);

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ContextProviders>
          <Router>
            <ScreamAppBar />
            <OverflowBody>
              <ResponsiveContainer>
                <ScreamSwitch />
              </ResponsiveContainer>
              {/*<ScreamFooter/>*/}
            </OverflowBody>
          </Router>
        </ContextProviders>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
