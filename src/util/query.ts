import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";

// Try to read the cors proxy from .env file first.
// If it fails, use the raw graphql endpoint
const ENDPOINT =
  process.env.REACT_APP_CORS_PROXY ?? "https://www.epicgames.com/graphql";

const client = new GraphQLClient(ENDPOINT);
export const sdk = getSdk(client);
