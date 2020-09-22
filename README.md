# WMS

## Folder Structure

    .
    ├── public                  # Compiled files (alternatively `dist`)
    ├── out                     # Documentation files (alternatively `doc`)
    ├── src                     # Source files (alternatively `lib` or `app`)
    |   ├── components          # Common/Shared components
    |   ├── helpers             # Helper Functions/Classes
    |   ├── layouts             # Common/Shared Layouts
    |   ├── middlewares         # chained functions called by the routes before the user-defined handler is invoked
    |   ├── redux               # All Classes, Functions & Configs Related Redux State Management
    |   |   ├── action-types    # All String variables defining action types
    |   |   ├── actions         # Functions representing actions that execute specific states
    |   |   ├── reducer         # Action/State Reducers
    |   |   ├── store           # Redux initial States Store & Configs
    |   ├── routes              # Webapp's routing config
    |   ├── views               # UI Pages
    ├── .env                    # Secret variable Storage
    ├── package.json            # Project's Metadata
    ├── .prettierrc             # Style Auto-Formatting Config
    ├── .eslintrc.json          # Linting Configuration
    ├── ....                    # Misc Configs brought by `create-react-app`
    ├── README.md
    └── .gitignore

## Installation

#### Clone The Repo:

```
$ git clone https://github.com/rutaks/wms-frontend.git
$ cd wms-frontend/

```

#### Install dependencies:

- Yarn:

```
$ yarn install
```

- npm:

```
$ npm install
```

#### Component documentation:

#### Run the project

```
$ yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
