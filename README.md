# 📜 ScreamDB

## 👋 Welcome

For user-friendly introduction, please check out the web app's [home page](https://scream-db.web.app/).
This document is meant for developers.

For discussions please refer to the [official forum topic](https://cs.rin.ru/forum/viewtopic.php?p=2297790#p2297790).

## 🏢 Hosting

The web app is hosted on 🔥 Firebase at <https://scream-db.web.app/>

It is automatically deployed on every push to the `master` branch.

## 🔐 The CORS issue

Modern browsers enforce strict [CORS] policy. That means the web
app cannot directly make requests to the Epic Games [GraphQL endpoint]. Furthermore,
the endpoint has a whitelist of valid `Referer` header values, which unfortunately is not possible to set using
browser's JavaScript. To overcome these issues I have deployed a simple CORS proxy script on the Cloudflare Workers
platform. It redirects all request to the actual GraphQL endpoint but modifies the response header
[`Access-Control-Allow-Origin`] with the domain of this web app.

[CORS]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[GraphQL endpoint]: https://launcher.store.epicgames.com/graphql
[`Access-Control-Allow-Origin`]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin

## 🛠️ Development

### ✔️ Requirements

- Node.js v22+
- pnpm v10

### 🚀 App architecture

This web was developed and hosted using great technologies such as:

- [🆁eact](https://react.dev/)
- [🆃ypescript](https://www.typescriptlang.org/)
- [🅼aterialUI](https://material-ui.com/)
- [🅶raphQL Code Generator](https://graphql-code-generator.com/)
- [🅲loudflare Workers](https://workers.cloudflare.com/)
- [🅵irebase](https://firebase.google.com/)

### 📜 Available Scripts

In the project directory, you can run the following commands:

| Command                | Action                                            |
| ---------------------- | ------------------------------------------------- |
| `pnpm dev`             | Starts vite development server                    |
| `pnpm graphql:codegen` | Starts code generator for graphql queries         |
| `pnpm build`           | Builds the app for distribution                   |
| `pnpm preview`         | Serves built app distribution on a preview server |

### 📖 Useful documentation

- UI Components: https://mui.com/material-ui/all-components/
- GraphQL: https://the-guild.dev/graphql/codegen/docs/guides/react-query
- Query: https://tanstack.com/query/latest/docs/framework/react/overview
- Routing: https://reactrouter.com/start/data/routing

## 📄 License

This software is licensed under [The Unlicense], terms of which are available in [UNLICENSE.txt](./UNLICENSE.txt).

[The Unlicense]: https://unlicense.org/
