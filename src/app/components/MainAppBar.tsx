import React from "react";
import { AppBar, Box, Button, Container, Link, Toolbar } from "@mui/material";
import { useLocale } from "~/core/hooks/useLocale.ts";
import { ViewModule } from "@mui/icons-material";
import { SearchBar } from "~/core/components/SearchBar.tsx";
import { Link as RouterLink, useLocation, useNavigate } from "react-router";
import { useSearchQuery } from "~/core/hooks/useSearchQuery.ts";
import bannerURL from "~/assets/banner.webp";
import { MAX_WIDTH_BREAKPOINT } from "~/core/theme.ts";
import { routes } from "~/core/routes.tsx";

export function MainAppBar(props: { ref: React.Ref<HTMLElement> }) {
  const location = useLocation();
  const navigate = useNavigate();
  const locale = useLocale();
  const { searchQuery, setSearchQuery } = useSearchQuery();

  async function onSearch(query: string) {
    if (location.pathname !== routes.games) {
      await navigate(routes.games);
    }

    setSearchQuery(query);
  }

  const homeBannerLink = (
    <Link
      component={RouterLink}
      to={routes.home}
      sx={{
        display: "flex",
        width: 120, // set fixed with to avoid layout shift
      }}
    >
      <img src={bannerURL} height={40} alt={"banner"} />
    </Link>
  );

  const browseGamesButton = (
    <Button
      component={RouterLink}
      color={"secondary"}
      startIcon={<ViewModule />}
      to={routes.games}
      children={locale.browse_games}
      onClick={() => setSearchQuery("")}
    />
  );

  const searchBar = (
    <SearchBar
      initial={searchQuery}
      placeholder={locale.search_games}
      onClear={(query) => void onSearch(query)}
      onSearch={(query) => void onSearch(query)}
    />
  );

  return (
    <AppBar
      ref={props.ref}
      position={"sticky"}
      sx={{ backgroundColor: (theme) => theme.palette.primary.dark, overflowX: "auto" }}
      enableColorOnDark
    >
      <Container maxWidth={MAX_WIDTH_BREAKPOINT} sx={{ minWidth: 656 }}>
        <Toolbar variant="dense" disableGutters>
          {homeBannerLink}
          <Box marginLeft={2} />
          {browseGamesButton}
          <Box marginLeft={2} />
          {searchBar}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
