# fuzzy-npm-run

> Run npm scripts quickly and fuzzily 🏃

[![NPM](https://nodei.co/npm/fuzzy-npm-run.png)](https://nodei.co/npm/fuzzy-npm-run/)

`fuzzy-npm-run` will allow you to pass a fuzzy search term that will decide which `npm run-script` to run. This is especially useful for projects which have many `npm scripts`, and can often take the format `build:production`, but with `fuzzy-npm-run` you can just run `nr b:p` and it will pick up this as the script you were wanting to run.

[![asciicast](https://asciinema.org/a/3y6fl354wo81okgi2does431g.png)](https://asciinema.org/a/3y6fl354wo81okgi2does431g)

## Installation
```bash
npm i -g fuzzy-npm-run
```

## Usage
`nr [search-term]`

#### `search-term` argument
This is a term that will be used by [`fuse.js`](http://fusejs.io/) to match against your package.json `scripts` section.
