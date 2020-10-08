# humans
Custom redesign of Legacy Student Media's Humans of Legacy Page. Written to replace the original tumblr version.<br/>
Written in Typescript with Vue.js frontend and small Node.js server.<br/>
Some PHP for serverless interfacing with web server (file uploads, etc)

## Directory structure
* `private/`: Private control panels to manipulate content store
* `public/`: HTML template / Vue entry point
* `src/`: Vue frontend app (components, main)
* `styles/`: External styles (not component-scoped)
* `server/`: Backend Node.js to serve static app content
* `types/`: Global typings (used by server, components)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
