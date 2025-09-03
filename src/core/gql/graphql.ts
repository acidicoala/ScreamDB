/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CatalogNs = {
  __typename?: "CatalogNs";
  mappings: Array<Mapping>;
};

export type CatalogNsMappingsArgs = {
  pageType?: InputMaybe<Scalars["String"]["input"]>;
};

export type CatalogOffersParams = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CatalogQuery = {
  __typename?: "CatalogQuery";
  catalogOffers: SearchStoreResponse;
  searchStore: SearchStoreResponse;
};

export type CatalogQueryCatalogOffersArgs = {
  namespace: Scalars["String"]["input"];
  params?: InputMaybe<CatalogOffersParams>;
};

export type CatalogQuerySearchStoreArgs = {
  category?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  keywords?: InputMaybe<Scalars["String"]["input"]>;
  namespace?: InputMaybe<Scalars["String"]["input"]>;
  sortBy?: InputMaybe<Scalars["String"]["input"]>;
  sortDir?: InputMaybe<Scalars["String"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Element = {
  __typename?: "Element";
  catalogNs: CatalogNs;
  creationDate: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  items: Array<Item>;
  keyImages?: Maybe<Array<KeyImage>>;
  namespace: Scalars["String"]["output"];
  offerType: OfferType;
  title: Scalars["String"]["output"];
};

export type Item = {
  __typename?: "Item";
  id: Scalars["String"]["output"];
  namespace: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type KeyImage = {
  __typename?: "KeyImage";
  type: KeyImageType;
  url: Scalars["String"]["output"];
};

export enum KeyImageType {
  CodeRedemption_340x440 = "CodeRedemption_340x440",
  DieselStoreFrontTall = "DieselStoreFrontTall",
  DieselStoreFrontWide = "DieselStoreFrontWide",
  OfferImageTall = "OfferImageTall",
  OfferImageWide = "OfferImageWide",
  Thumbnail = "Thumbnail",
}

export type Mapping = {
  __typename?: "Mapping";
  pageSlug: Scalars["String"]["output"];
};

export enum OfferType {
  AddOn = "ADD_ON",
  BaseGame = "BASE_GAME",
  Bundle = "BUNDLE",
  Dlc = "DLC",
  Edition = "EDITION",
  Others = "OTHERS",
  Unlockable = "UNLOCKABLE",
}

export type Paging = {
  __typename?: "Paging";
  count: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  Catalog: CatalogQuery;
};

export type SearchStoreResponse = {
  __typename?: "SearchStoreResponse";
  elements: Array<Element>;
  paging: Paging;
};

export type SearchGameOffersQueryVariables = Exact<{
  namespace: Scalars["String"]["input"];
}>;

export type SearchGameOffersQuery = {
  __typename?: "Query";
  Catalog: {
    __typename?: "CatalogQuery";
    catalogOffers: {
      __typename?: "SearchStoreResponse";
      elements: Array<{
        __typename?: "Element";
        id: string;
        title: string;
        offerType: OfferType;
        items: Array<{ __typename?: "Item"; id: string }>;
        keyImages?: Array<{ __typename?: "KeyImage"; type: KeyImageType; url: string }> | null;
      }>;
    };
    searchStore: {
      __typename?: "SearchStoreResponse";
      elements: Array<{
        __typename?: "Element";
        id: string;
        title: string;
        description: string;
        namespace: string;
        keyImages?: Array<{ __typename?: "KeyImage"; type: KeyImageType; url: string }> | null;
        catalogNs: {
          __typename?: "CatalogNs";
          mappings: Array<{ __typename?: "Mapping"; pageSlug: string }>;
        };
      }>;
    };
  };
};

export type SearchStoreQueryVariables = Exact<{
  count: Scalars["Int"]["input"];
  keywords: Scalars["String"]["input"];
  sortBy?: InputMaybe<Scalars["String"]["input"]>;
  sortDir?: InputMaybe<Scalars["String"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type SearchStoreQuery = {
  __typename?: "Query";
  Catalog: {
    __typename?: "CatalogQuery";
    searchStore: {
      __typename?: "SearchStoreResponse";
      elements: Array<{
        __typename?: "Element";
        id: string;
        title: string;
        namespace: string;
        creationDate: string;
        items: Array<{ __typename?: "Item"; id: string; namespace: string }>;
        keyImages?: Array<{ __typename?: "KeyImage"; type: KeyImageType; url: string }> | null;
      }>;
      paging: { __typename?: "Paging"; total: number };
    };
  };
};

export const SearchGameOffersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "searchGameOffers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "namespace" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "Catalog" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "catalogOffers" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "namespace" },
                      value: { kind: "Variable", name: { kind: "Name", value: "namespace" } },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "params" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "count" },
                            value: { kind: "IntValue", value: "1000" },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "elements" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "offerType" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "items" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "keyImages" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "type" } },
                                  { kind: "Field", name: { kind: "Name", value: "url" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "searchStore" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "category" },
                      value: { kind: "StringValue", value: "games/edition/base", block: false },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "namespace" },
                      value: { kind: "Variable", name: { kind: "Name", value: "namespace" } },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "elements" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "description" } },
                            { kind: "Field", name: { kind: "Name", value: "namespace" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "keyImages" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "type" } },
                                  { kind: "Field", name: { kind: "Name", value: "url" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "catalogNs" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "mappings" },
                                    arguments: [
                                      {
                                        kind: "Argument",
                                        name: { kind: "Name", value: "pageType" },
                                        value: {
                                          kind: "StringValue",
                                          value: "productHome",
                                          block: false,
                                        },
                                      },
                                    ],
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "pageSlug" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchGameOffersQuery, SearchGameOffersQueryVariables>;
export const SearchStoreDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "searchStore" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "count" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "keywords" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sortBy" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sortDir" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "start" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "Catalog" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "searchStore" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "category" },
                      value: { kind: "StringValue", value: "games/edition/base", block: false },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "count" },
                      value: { kind: "Variable", name: { kind: "Name", value: "count" } },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "keywords" },
                      value: { kind: "Variable", name: { kind: "Name", value: "keywords" } },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "sortBy" },
                      value: { kind: "Variable", name: { kind: "Name", value: "sortBy" } },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "sortDir" },
                      value: { kind: "Variable", name: { kind: "Name", value: "sortDir" } },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "start" },
                      value: { kind: "Variable", name: { kind: "Name", value: "start" } },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "elements" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "namespace" } },
                            { kind: "Field", name: { kind: "Name", value: "creationDate" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "items" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  { kind: "Field", name: { kind: "Name", value: "namespace" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "keyImages" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "type" } },
                                  { kind: "Field", name: { kind: "Name", value: "url" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "paging" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "total" } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchStoreQuery, SearchStoreQueryVariables>;
