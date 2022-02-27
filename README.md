# 🐨 ScreamDB

### Welcome to the ScreamDB repository.

For user-friendly introduction, please check out the web app's [home page](https://scream-db.web.app/). This document is meant for developers.

## 🚀 App architecture

This web was developed and hosted using great technologies such as:

* [🆁eact](https://reactjs.org/)
* [🆃ypescript](https://www.typescriptlang.org/)
* [🅼aterialUI](https://material-ui.com/)
* [🅶raphQL Code Generator](https://graphql-code-generator.com/)
* [🅲loudflare Workers](https://workers.cloudflare.com/)
* [🅵irebase](https://firebase.google.com/)

## 🏢 Hosting

The web app is hosted on 🔥 Firebase at <https://scream-db.web.app/>

## 🔐 The CORS issue

Modern browsers enforce strict [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy. That means the web app cannot directly make requests to the Epic's [GraphQL endpoint](https://www.epicgames.com/graphql). Furthermore, Epic Games' GraphQL endpoint has a whitelist of valid `Referer` header values, which unfortunately is not possible to set using browser's JavaScript. To overcome these issues I have deployed a simple CORS proxy script on the Cloudflare Workers platform. It redirects all request to the actual GraphQL endpoint but modifies the response header [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) with the domain of this web app. The source of the script is available in this repository: [epic-cors-proxy](./workers/epic-cors-proxy.js). The project is configured to use this proxy in development and production, but it is possible to override them via `.env` files.

## 🌐 Localization

Currently, the following languages are supported:
* English
* Spanish (Credit to @g-yui)
* Russian
* Simplified Chinese (Credit to @Citrinae-Lime)

The web app localization is defined in [src/util/locale.ts](./src/util/locale.ts).

Furthermore, home page is rendering localized Markdown documents located at [src/md](./src/md).

If you wish to contribute a translation for another language, you are free to submit a pull request.

## 📜 Available Scripts

In the project directory, you can run the following commands:

| Command             | Documentation                                   |
|---------------------|-------------------------------------------------|
| `yarn start`        | [start @ CRA docs]                              |
| `yarn build`        | [build @ CRA docs]                              |
| `yarn deploy`       | [deploy @ Firebase docs]                        |
| `yarn generate-sdk` | [graphql-codegen @ GraphQL Code Generator docs] |

The commands above assume that the corresponding CLI tools have been installed and configured.

## 📄 License
This software is licensed under [Zero Clause BSD](https://choosealicense.com/licenses/0bsd/) license, terms of which are available in [LICENSE.txt](./LICENSE.txt).

[start @ CRA docs]: https://github.com/facebook/create-react-app#npm-start-or-yarn-start                                   
[build @ CRA docs]: https://github.com/facebook/create-react-app#npm-run-build-or-yarn-build                               
[deploy @ Firebase docs]: https://firebase.google.com/docs/cli#deployment                                                  
[graphql-codegen @ GraphQL Code Generator docs]: https://graphql-code-generator.com/docs/plugins/typescript-graphql-request
