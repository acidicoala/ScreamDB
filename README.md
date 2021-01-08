# ScreamDB

The web app is hosted on 🔥 Firebase at <https://scream-db.web.app/>

## Running the project locally

To run the project locally, you need to create a `.env.development` file with `REACT_APP_CORS_PROXY` property
pointing to a cors proxy server, since by default browsers will block requests to epic servers
due to CORS policy.

To deploy the application, you need to define the `REACT_APP_CORS_PROXY` property in the `.env.production` file

## Localization

The web app localization is defined in [src/util/locale.ts](./src/util/locale.ts).
<br>
Furthermore, home page is rendering markdown documents located at [src/md](./src/md).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

Deploys the built app files to Firebase hosting. The firebase has to be configured prior to running this command. M
See the [Firebase docs](https://firebase.google.com/docs/hosting) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
