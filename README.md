# Frontend Recruitment Task
This project is an implementation of a recruitment task.
The goal was to create two pages with sign up and sign in form.
React with TypeScript was chosen as the framework and Airbnb's config was adapted for linting.

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
To be described.

## Design
The design follows the provided wireframes. Color scheme was inspired by blackberries and raspberries. A simple logo is included that transforms between the two to catch user's attention and make the design more fun and remarkable. The animation is slightly randomized every time.