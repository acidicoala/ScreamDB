import { graphql } from "~/core/gql/index.ts";
import type { SearchGameOffersQuery } from "~/core/gql/graphql.ts";

export const searchGameOffersQueryDocument = graphql(/* GraphQL */ `
  query searchGameOffers($namespace: String!) {
    Catalog {
      catalogOffers(namespace: $namespace, params: { count: 1000 }) {
        elements {
          id
          title
          offerType
          items {
            id
          }
          keyImages {
            type
            url
          }
        }
      }

      # Get the game info as well
      searchStore(category: "games/edition/base", namespace: $namespace) {
        elements {
          id
          title
          description
          namespace
          keyImages {
            type
            url
          }
          catalogNs {
            mappings(pageType: "productHome") {
              pageSlug
            }
          }
        }
      }
    }
  }
`);

export type GameData = SearchGameOffersQuery["Catalog"]["searchStore"]["elements"][number];
