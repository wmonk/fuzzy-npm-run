# fuzzy-npm-run

> Run npm scripts quickly and fuzzily 🏃

[![NPM][fuzzy-npm-run-icon] ][fuzzy-npm-run-url]

`fuzzy-npm-run` will allow you to pass a fuzzy search term that will decide which `npm run-script` to run. This is especially useful for projects which have many `npm scripts`, and can often take the format `build:production`. 

## Installation
```bash
npm i -g fuzzy-npm-run
```

## Usage
`nr [search-term]`

#### `search-term` argument
This is a term that will be used by [`fuse.js`](http://fusejs.io/) to match against your package.json `scripts` section.
