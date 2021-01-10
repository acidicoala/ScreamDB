import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  Catalog?: Maybe<CatalogQuery>;
};

export type CatalogQuery = {
  __typename?: 'CatalogQuery';
  searchStore: Elements;
  catalogOffers: Elements;
};


export type CatalogQuerySearchStoreArgs = {
  category?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  keywords?: Maybe<Scalars['String']>;
};


export type CatalogQueryCatalogOffersArgs = {
  namespace: Scalars['String'];
  params?: Maybe<CatalogOffersParams>;
};

export type CatalogOffersParams = {
  count?: Maybe<Scalars['Int']>;
};

export type Elements = {
  __typename?: 'Elements';
  elements: Array<Element>;
};

export type Element = {
  __typename?: 'Element';
  id: Scalars['String'];
  title: Scalars['String'];
  namespace: Scalars['String'];
  offerType: OfferType;
  items: Array<Item>;
  keyImages: Array<KeyImage>;
};

export enum OfferType {
  AddOn = 'ADD_ON',
  BaseGame = 'BASE_GAME',
  Bundle = 'BUNDLE',
  Edition = 'EDITION',
  Dlc = 'DLC',
  Others = 'OTHERS',
  Unlockable = 'UNLOCKABLE'
}

export type Item = {
  __typename?: 'Item';
  id: Scalars['String'];
  title: Scalars['String'];
  namespace: Scalars['String'];
};

export type KeyImage = {
  __typename?: 'KeyImage';
  type: KeyImageType;
  url?: Maybe<Scalars['String']>;
};

export enum KeyImageType {
  OfferImageTall = 'OfferImageTall',
  OfferImageWide = 'OfferImageWide',
  Thumbnail = 'Thumbnail',
  CodeRedemption_340x440 = 'CodeRedemption_340x440',
  DieselStoreFrontTall = 'DieselStoreFrontTall',
  DieselStoreFrontWide = 'DieselStoreFrontWide'
}

export type SearchGamesQueryVariables = Exact<{
  keywords: Scalars['String'];
}>;


export type SearchGamesQuery = (
  { __typename?: 'Query' }
  & { Catalog?: Maybe<(
    { __typename?: 'CatalogQuery' }
    & { searchStore: (
      { __typename?: 'Elements' }
      & { elements: Array<(
        { __typename?: 'Element' }
        & Pick<Element, 'id' | 'title' | 'namespace'>
        & { items: Array<(
          { __typename?: 'Item' }
          & Pick<Item, 'id' | 'namespace'>
        )>, keyImages: Array<(
          { __typename?: 'KeyImage' }
          & Pick<KeyImage, 'type' | 'url'>
        )> }
      )> }
    ) }
  )> }
);

export type SearchOffersQueryVariables = Exact<{
  namespace: Scalars['String'];
}>;


export type SearchOffersQuery = (
  { __typename?: 'Query' }
  & { Catalog?: Maybe<(
    { __typename?: 'CatalogQuery' }
    & { catalogOffers: (
      { __typename?: 'Elements' }
      & { elements: Array<(
        { __typename?: 'Element' }
        & Pick<Element, 'id' | 'title' | 'offerType'>
        & { items: Array<(
          { __typename?: 'Item' }
          & Pick<Item, 'id'>
        )>, keyImages: Array<(
          { __typename?: 'KeyImage' }
          & Pick<KeyImage, 'type' | 'url'>
        )> }
      )> }
    ) }
  )> }
);


export const SearchGamesDocument = gql`
    query searchGames($keywords: String!) {
  Catalog {
    searchStore(category: "games/edition/base", count: 1000, keywords: $keywords) {
      elements {
        id
        title
        namespace
        items {
          id
          namespace
        }
        keyImages {
          type
          url
        }
      }
    }
  }
}
    `;
export const SearchOffersDocument = gql`
    query searchOffers($namespace: String!) {
  Catalog {
    catalogOffers(namespace: $namespace, params: {count: 1000}) {
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
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    searchGames(variables: SearchGamesQueryVariables, requestHeaders?: Headers): Promise<SearchGamesQuery> {
      return withWrapper(() => client.request<SearchGamesQuery>(print(SearchGamesDocument), variables, requestHeaders));
    },
    searchOffers(variables: SearchOffersQueryVariables, requestHeaders?: Headers): Promise<SearchOffersQuery> {
      return withWrapper(() => client.request<SearchOffersQuery>(print(SearchOffersDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;