/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  query searchGameOffers($namespace: String!) {\n    Catalog {\n      catalogOffers(namespace: $namespace, params: { count: 1000 }) {\n        elements {\n          id\n          title\n          offerType\n          items {\n            id\n          }\n          keyImages {\n            type\n            url\n          }\n        }\n      }\n\n      # Get the game info as well\n      searchStore(category: "games/edition/base", namespace: $namespace) {\n        elements {\n          id\n          title\n          description\n          namespace\n          keyImages {\n            type\n            url\n          }\n          catalogNs {\n            mappings(pageType: "productHome") {\n              pageSlug\n            }\n          }\n        }\n      }\n    }\n  }\n': typeof types.SearchGameOffersDocument;
  '\n  query searchStore(\n    $count: Int!\n    $keywords: String!\n    $sortBy: String\n    $sortDir: String\n    $start: Int\n  ) {\n    Catalog {\n      searchStore(\n        category: "games/edition/base"\n        count: $count\n        keywords: $keywords\n        sortBy: $sortBy\n        sortDir: $sortDir\n        start: $start\n      ) {\n        elements {\n          id\n          title\n          namespace\n          creationDate\n          items {\n            id\n            namespace\n          }\n          keyImages {\n            type\n            url\n          }\n        }\n        paging {\n          total\n        }\n      }\n    }\n  }\n': typeof types.SearchStoreDocument;
};
const documents: Documents = {
  '\n  query searchGameOffers($namespace: String!) {\n    Catalog {\n      catalogOffers(namespace: $namespace, params: { count: 1000 }) {\n        elements {\n          id\n          title\n          offerType\n          items {\n            id\n          }\n          keyImages {\n            type\n            url\n          }\n        }\n      }\n\n      # Get the game info as well\n      searchStore(category: "games/edition/base", namespace: $namespace) {\n        elements {\n          id\n          title\n          description\n          namespace\n          keyImages {\n            type\n            url\n          }\n          catalogNs {\n            mappings(pageType: "productHome") {\n              pageSlug\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.SearchGameOffersDocument,
  '\n  query searchStore(\n    $count: Int!\n    $keywords: String!\n    $sortBy: String\n    $sortDir: String\n    $start: Int\n  ) {\n    Catalog {\n      searchStore(\n        category: "games/edition/base"\n        count: $count\n        keywords: $keywords\n        sortBy: $sortBy\n        sortDir: $sortDir\n        start: $start\n      ) {\n        elements {\n          id\n          title\n          namespace\n          creationDate\n          items {\n            id\n            namespace\n          }\n          keyImages {\n            type\n            url\n          }\n        }\n        paging {\n          total\n        }\n      }\n    }\n  }\n':
    types.SearchStoreDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query searchGameOffers($namespace: String!) {\n    Catalog {\n      catalogOffers(namespace: $namespace, params: { count: 1000 }) {\n        elements {\n          id\n          title\n          offerType\n          items {\n            id\n          }\n          keyImages {\n            type\n            url\n          }\n        }\n      }\n\n      # Get the game info as well\n      searchStore(category: "games/edition/base", namespace: $namespace) {\n        elements {\n          id\n          title\n          description\n          namespace\n          keyImages {\n            type\n            url\n          }\n          catalogNs {\n            mappings(pageType: "productHome") {\n              pageSlug\n            }\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query searchGameOffers($namespace: String!) {\n    Catalog {\n      catalogOffers(namespace: $namespace, params: { count: 1000 }) {\n        elements {\n          id\n          title\n          offerType\n          items {\n            id\n          }\n          keyImages {\n            type\n            url\n          }\n        }\n      }\n\n      # Get the game info as well\n      searchStore(category: "games/edition/base", namespace: $namespace) {\n        elements {\n          id\n          title\n          description\n          namespace\n          keyImages {\n            type\n            url\n          }\n          catalogNs {\n            mappings(pageType: "productHome") {\n              pageSlug\n            }\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query searchStore(\n    $count: Int!\n    $keywords: String!\n    $sortBy: String\n    $sortDir: String\n    $start: Int\n  ) {\n    Catalog {\n      searchStore(\n        category: "games/edition/base"\n        count: $count\n        keywords: $keywords\n        sortBy: $sortBy\n        sortDir: $sortDir\n        start: $start\n      ) {\n        elements {\n          id\n          title\n          namespace\n          creationDate\n          items {\n            id\n            namespace\n          }\n          keyImages {\n            type\n            url\n          }\n        }\n        paging {\n          total\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query searchStore(\n    $count: Int!\n    $keywords: String!\n    $sortBy: String\n    $sortDir: String\n    $start: Int\n  ) {\n    Catalog {\n      searchStore(\n        category: "games/edition/base"\n        count: $count\n        keywords: $keywords\n        sortBy: $sortBy\n        sortDir: $sortDir\n        start: $start\n      ) {\n        elements {\n          id\n          title\n          namespace\n          creationDate\n          items {\n            id\n            namespace\n          }\n          keyImages {\n            type\n            url\n          }\n        }\n        paging {\n          total\n        }\n      }\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
