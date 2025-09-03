import { graphql } from "~/core/gql/index";

export const searchStoreQueryDocument = graphql(/* GraphQL */ `
  query searchStore(
    $count: Int!
    $keywords: String!
    $sortBy: String
    $sortDir: String
    $start: Int
  ) {
    Catalog {
      searchStore(
        category: "games/edition/base"
        count: $count
        keywords: $keywords
        sortBy: $sortBy
        sortDir: $sortDir
        start: $start
      ) {
        elements {
          id
          title
          namespace
          creationDate
          items {
            id
            namespace
          }
          keyImages {
            type
            url
          }
        }
        paging {
          total
        }
      }
    }
  }
`);
