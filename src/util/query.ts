import {gql, request} from 'graphql-request'
import {Catalog} from "./types";

function query(variables: object) {
	// CORS proxy is required since the web app domain differs from the epic domain (obviously)
	// So the browser will block the request. To overcome this issue, I proxy the results through
	// a proxy server that removes the same-domain origin restrictions. If you do not define
	// a proxy server in .env files, the original graphql endpoint is used
	const corsProxy = process.env.REACT_APP_CORS_PROXY ?? 'https://www.epicgames.com/graphql'
	const query = gql`
        query searchStoreQuery(
            $category: String,
            $count: Int,
            $keywords: String,
            $namespace: String,
        ) {
            Catalog {
                searchStore(
                    category: $category
                    count: $count
                    keywords: $keywords
                    namespace: $namespace,
                ) {
                    elements {
                        id
                        title
                        namespace
                        keyImages {
                            type
                            url
                        }
                        items {
                            id
                            namespace
                        }
                    }
                }
            }
        }
	`
	return request<{ Catalog: Catalog }>(corsProxy, query, {count: 1000, ...variables})
		.then(it => it.Catalog.searchStore.elements)
}

export function searchGames(keywords: string) {
	return query({
		category: "games/edition/base|bundles/games|editors|software/edition/base",
		keywords: keywords,
	})
}

export function searchDLCs(namespace: string) {
	return query({
		category: "addons|digitalextras",
		namespace: namespace,
	})
}
