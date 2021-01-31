# humans

Custom redesign of Legacy Student Media's Humans of Legacy Page. Written to replace the original tumblr version.<br/>
Written in Typescript with Vue.js frontend and small Node.js server.<br/>
Some PHP for serverless interfacing with web server (file uploads, etc)

## Directory structure

- `src/api/`: Vercel serverless functions to manipulate post data
- `src/web`: Vue frontend app (components, main)
- `src/types/`: Global typings (used by server, components)
- `private/`: Private control panels to manipulate content store
- `public/`: HTML template / Vue entry point
- `styles/`: External styles (not component-scoped)

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
