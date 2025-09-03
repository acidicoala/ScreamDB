import { createBrowserRouter, Navigate } from "react-router";
import { App } from "~/app/App.tsx";
import { GamesPage } from "~/features/games/GamesPage.tsx";
import { GameOffersPage } from "~/features/game-offers/GameOffersPage.tsx";
import { HomePage } from "~/features/home/HomePage.tsx";

export const routes = {
  home: "/",
  games: "/games",
  gameOffers: (namespace: string) => `/games/${namespace}`,
} as const;

export const router = createBrowserRouter([
  {
    path: routes.home,
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: routes.games, Component: GamesPage },
      { path: routes.gameOffers(":namespace"), Component: GameOffersPage },
    ],
  },
  {
    path: "*",
    element: <Navigate to={routes.home} replace />,
  },
]);
