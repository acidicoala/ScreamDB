# ScreamDB
Some description?


## App architecture

React, Typescript, GraphQL, MaterialUI, Firebase, Workers


## Hosting

The web app is hosted on 🔥 Firebase at <https://scream-db.web.app/>


## The CORS issue

To run the project locally, you need to create a `.env.development` file with `REACT_APP_CORS_PROXY` property
pointing to a cors proxy server, since by default browsers will block requests to epic servers
due to CORS policy.

To deploy the application, you need to define the `REACT_APP_CORS_PROXY` property in the `.env.production` file


## Localization

The web app localization is defined in [src/util/locale.ts](./src/util/locale.ts).
<br>
Furthermore, home page is rendering localized markdown documents located at [src/md](./src/md).


## Available Scripts

In the project directory, you can run:

* `yarn start`  [start @ CRA docs](https://github.com/facebook/create-react-app#npm-start-or-yarn-start)
* `yarn build`  [build @ CRA docs](https://github.com/facebook/create-react-app#npm-run-build-or-yarn-build)
* `yarn deploy` [deploy @ Firebase docs](https://firebase.google.com/docs/cli#deployment)


