# Frontend Recruitment Task
This project is an implementation of a recruitment task.
The goal was to create two pages with sign up and sign in form.
React with TypeScript was chosen as the framework and Airbnb's config was adapted for linting.

There are 3 deployments of this project
- https://m-rozbicki.github.io/signup-frontend-task - master branch
- https://m-rozbicki.github.io/signup-frontend-task/staging - develop branch
- https://m-rozbicki.github.io/signup-frontend-task/with-transitions - branch with page transitions not removed

You can use following credentials to sign in:
```
e-mail: john.doe@mail.com
password: longenoughpassword
```

You can try signing in / up with special e-mails / names
- Sign in with "fail@me.com" / sign up with "fail me" name to simulate internal server error
- Sign in with "timeout@me.com" / sign up with "timeout me" name to simulate no server response
- Sign in with "network.error@me.com" / sign up with "network error me" name to simulate network error
- Sign up with "already@registered.com" e-mail to simulate situation where provided e-mail is already registered

## Technology Stack
- [React](https://reactjs.org/) - a JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - static type definitions for JavaScript
- [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) - keeps track of values/errors/visited fields and validation
- [Mock Service Worker](https://mswjs.io/) - intercepts requests on the network level, used for tests and prototyping
- [React Router](https://reactrouter.com/) - collection of navigational components
- [React Transition Group](https://reactcommunity.org/react-transition-group/) - exposes transition stages, manages classes and group elements
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/) - JavaScript Testing Framework and testing utilities
- [GitHub Actions](https://github.com/features/actions) & [GitHub Pages](https://pages.github.com/) - builds, tests, and deploys your code right from GitHub

## Installation
Install with yarn:
```
yarn install
```
Lint and run tests:
```
yarn lint && yarn test
```
Start the app:
```
yarn start
```

## Tests
Tests can be found along the components. Mock Service Worker was used both for tests and API response simulation in the built app so real (Axios) requests could have been implemented. Validation schemas are shared between the sign up and sign in forms and MSW.

## CI/CD
GitHub Actions are set up to lint, test and build on pull requests to master and develop branches and additionally to deploy to GitHub Pages when pull requests are merged.

- https://m-rozbicki.github.io/signup-frontend-task
- https://m-rozbicki.github.io/signup-frontend-task/staging

## Design
The design follows the provided wireframes. Color scheme was inspired by blackberries and raspberries. A simple logo is included that transforms between the two to catch user's attention and to make the design more fun and remarkable. The animation is slightly randomized every time.

## Page Transitions
I've decided to remove page transitions from the main branches. Despite React Transition Group being mentioned in React documentation and seeming to be the most popular solution to the problem, it turned out to be outdated and  buggy. I was able to make it work with nodeRef workarounds and while the result was okay on the desktop, it caused glitches on mobile devices that I couldn't resolve. I didn't find a better way to solve this for now and I didn't want to delay the project.

The removed solution can be found at:
- https://github.com/m-rozbicki/signup-frontend-task/tree/with-transitions

And it's deployed to:
- https://m-rozbicki.github.io/signup-frontend-task/with-transitions