import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  CssBaseline,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core";

import { config } from "config";
import { ZoomProvider } from "lib/zoom";
import { themeSelector } from "redux/reducers";
import { AppGlobalStyle } from "./AppGlobalStyle";
import createTheme from "./theme";

export const AppProviders = (props) => {
  const theme = useSelector(themeSelector);

  return (
    <StylesProvider injectFirst>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
          <CssBaseline />
          <ThemeProvider theme={createTheme(theme.currentTheme)}>
            <AppGlobalStyle />
            <ZoomProvider apiKey={config.zoom.apiKey}>
              {props.children}
            </ZoomProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </StylesProvider>
  );
};