import React from 'react';
import {Container, createMuiTheme, CssBaseline, responsiveFontSizes, ThemeOptions, ThemeProvider} from "@material-ui/core";
import {ScreamAppBar} from "./components/appbar/ScreamAppBar";
import {ScreamSwitch} from "./components/router/ScreamSwitch";
import {BrowserRouter as Router} from "react-router-dom";
import {ContextProviders} from "./context/ContextProviders";
import {maxWidth} from "./util/storage";

const theme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			type: 'dark',
			primary: {
				main: '#2e7d32',
				contrastText: '#FFF',
			},
			secondary: {
				main: '#FFF',
			},
			background: {
				default: '#303030'
			}
		},
	} as ThemeOptions)
);

function App() {
	return (
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<ContextProviders>
					<Router>
						<ScreamAppBar/>
						<Container maxWidth={maxWidth}>
							<ScreamSwitch/>
						</Container>
					</Router>
				</ContextProviders>
			</ThemeProvider>
		</React.StrictMode>
	);
}

export default App;
