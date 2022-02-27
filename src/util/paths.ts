export const path = {
  to: {
    home: "/",
    games: "/games",
    offers: (namespace?: any) => `/offers/${namespace || ""}`,
  },
};
