import { GraphQLResolveInfo } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  namespace?: Maybe<Scalars['String']>;
  keywords?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
  sortDir?: Maybe<Scalars['String']>;
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
  creationDate: Scalars['String'];
  productSlug?: Maybe<Scalars['String']>;
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
  sortBy?: Maybe<Scalars['String']>;
  sortDir?: Maybe<Scalars['String']>;
}>;


export type SearchGamesQuery = (
  { __typename?: 'Query' }
  & { Catalog?: Maybe<(
    { __typename?: 'CatalogQuery' }
    & { searchStore: (
      { __typename?: 'Elements' }
      & { elements: Array<(
        { __typename?: 'Element' }
        & Pick<Element, 'id' | 'title' | 'namespace' | 'creationDate'>
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
    ), searchStore: (
      { __typename?: 'Elements' }
      & { elements: Array<(
        { __typename?: 'Element' }
        & Pick<Element, 'title' | 'productSlug'>
      )> }
    ) }
  )> }
);



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  CatalogQuery: ResolverTypeWrapper<CatalogQuery>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CatalogOffersParams: CatalogOffersParams;
  Elements: ResolverTypeWrapper<Elements>;
  Element: ResolverTypeWrapper<Element>;
  OfferType: OfferType;
  Item: ResolverTypeWrapper<Item>;
  KeyImage: ResolverTypeWrapper<KeyImage>;
  KeyImageType: KeyImageType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  CatalogQuery: CatalogQuery;
  String: Scalars['String'];
  Int: Scalars['Int'];
  CatalogOffersParams: CatalogOffersParams;
  Elements: Elements;
  Element: Element;
  Item: Item;
  KeyImage: KeyImage;
  Boolean: Scalars['Boolean'];
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Catalog?: Resolver<Maybe<ResolversTypes['CatalogQuery']>, ParentType, ContextType>;
};

export type CatalogQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CatalogQuery'] = ResolversParentTypes['CatalogQuery']> = {
  searchStore?: Resolver<ResolversTypes['Elements'], ParentType, ContextType, RequireFields<CatalogQuerySearchStoreArgs, never>>;
  catalogOffers?: Resolver<ResolversTypes['Elements'], ParentType, ContextType, RequireFields<CatalogQueryCatalogOffersArgs, 'namespace'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ElementsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Elements'] = ResolversParentTypes['Elements']> = {
  elements?: Resolver<Array<ResolversTypes['Element']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ElementResolvers<ContextType = any, ParentType extends ResolversParentTypes['Element'] = ResolversParentTypes['Element']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  offerType?: Resolver<ResolversTypes['OfferType'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType>;
  keyImages?: Resolver<Array<ResolversTypes['KeyImage']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productSlug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeyImage'] = ResolversParentTypes['KeyImage']> = {
  type?: Resolver<ResolversTypes['KeyImageType'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  CatalogQuery?: CatalogQueryResolvers<ContextType>;
  Elements?: ElementsResolvers<ContextType>;
  Element?: ElementResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  KeyImage?: KeyImageResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


export const SearchGamesDocument = gql`
    query searchGames($keywords: String!, $sortBy: String, $sortDir: String) {
  Catalog {
    searchStore(
      category: "games/edition/base"
      count: 1000
      keywords: $keywords
      sortBy: $sortBy
      sortDir: $sortDir
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
    searchStore(category: "games/edition/base", namespace: $namespace) {
      elements {
        title
        productSlug
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