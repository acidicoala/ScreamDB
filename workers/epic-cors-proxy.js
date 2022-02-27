// eslint-disable-next-line no-restricted-globals
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    const patchedRequest = new Request('https://www.epicgames.com/graphql', {
        ...request,
        headers: new Headers({
            // Define customer headers to avoid faulty headers like "Referer"
            "Content-type": "application/json"
        })
    })

    return fetch(patchedRequest.url, patchedRequest).then(res => {
        const origin = request.headers.get("origin")
        const headers = new Headers(res.headers)
        headers.set("Access-Control-Allow-Origin", origin)
        headers.set("Access-Control-Allow-Headers", "Content-Type")

        return new Response(res.body, {
            ...res,
            headers: headers
        })
    })
}