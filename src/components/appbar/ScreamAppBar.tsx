import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Container,
  createStyles,
  Divider,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { maxWidth } from "../../util/storage";
import { path } from "../../util/paths";
import { useLocale } from "../../hooks/locale";
import { useXS } from "../../hooks/screen-size";
import { LanguagePicker } from "./LanguagePicker";
import { Link, useHistory } from "react-router-dom";
import AnimateHeight from "react-animate-height";
import { Menu } from "@material-ui/icons";
import { ScreamLink } from "../util/Link";
import { useKeywords } from "../../context/keywords";
import { SearchBar } from "../util/SearchBar";

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      padding: 0,
    },
  })
);

export function ScreamAppBar() {
  const history = useHistory();
  const { locale } = useLocale();
  const classes = useStyles();
  const { setKeywords } = useKeywords();
  const xs = useXS();

  const [open, setOpen] = useState(false);

  const NavButtons = () => (
    <ButtonGroup variant="text" size={"large"}>
      {
        <Button
          component={Link}
          to={path.to.games}
          children={locale.browse_games}
          onClick={() => setKeywords("")}
        />
      }
    </ButtonGroup>
  );

  function onSearch(query: string) {
    if (history.location.pathname !== path.to.games) history.push(path.to.games);
    setKeywords(query);
  }

  return (
    <AppBar position={xs ? "static" : "sticky"}>
      <Container maxWidth={maxWidth}>
        <Toolbar color="primary" className={classes.toolbar}>
          <Hidden mdUp>
            <IconButton onClick={() => setOpen(!open)} children={<Menu />} />
          </Hidden>
          <ScreamLink to={path.to.home}>
            <Typography variant={"h5"} children={<b>ScreamDB</b>} />
          </ScreamLink>
          <Box marginX={1} />
          <Hidden xsDown children={<NavButtons />} />
          <Box marginX={1} />
          <Hidden
            smDown
            children={<SearchBar placeholder={locale.search_games} onSearch={onSearch} />}
          />
          <Box flex={1} />
          <Box marginX={1} />
          <LanguagePicker />
          {/* <Settings/> */}
          {/* Reserved for future use*/}
        </Toolbar>
        <Hidden mdUp>
          <AnimateHeight duration={250} height={open ? "auto" : 0}>
            <Divider />
            <Toolbar>
              <Box paddingLeft={4} width={"100%"} paddingY={1}>
                <SearchBar placeholder={locale.search_games} onSearch={onSearch} />
                <Box marginY={1} />
                <Hidden smUp children={<NavButtons />} />
              </Box>
            </Toolbar>
          </AnimateHeight>
        </Hidden>
      </Container>
    </AppBar>
  );
}
