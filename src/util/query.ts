import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql'; // THIS FILE IS THE GENERATED FILE'

const ENDPOINT = process.env.REACT_APP_CORS_PROXY ?? 'https://www.epicgames.com/graphql'

const client = new GraphQLClient(ENDPOINT);
export const sdk = getSdk(client);

