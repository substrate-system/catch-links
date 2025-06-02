# catch links
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/catch-links/nodejs.yml?style=flat-square)](https://github.com/substrate-system/catch-links/actions/workflows/nodejs.yml)
[![Socket Badge](https://socket.dev/api/badge/npm/package/@substrate-system/catch-links)](https://socket.dev/npm/package/@substrate-system/catch-links)
[![types](https://img.shields.io/npm/types/@substrate-system/catch-links?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![license](https://img.shields.io/badge/license-Polyform_Non_Commercial-26bc71?style=flat-square)](LICENSE)


Like the classic [@substack module](https://www.npmjs.com/package/catch-links), but updated.

Intercept local link clicks on a page, for client-side pushState UIs.

This is used as a part of [route-event](https://github.com/substrate-system/route-event). That is the recommended way to consume this.

<details><summary><h2>Contents</h2></summary>
<!-- toc -->
</details>


## install
```sh
npm i -S @substrate-system/catch-links
```

## use

### common JS
```js
const catchLinks = require('@substrate-system/catch-links').default
```

### ESM
```js
import CatchLinks from '@substrate-system/catch-links'
```

## example

Given this HTML,
```html
<body>
    <a id="local-link" href="/foo">local</a>
    <a href="https://www.npmjs.com/" id="remote-link">remote</a>
</body>
```

Use this JS:
```js
import CatchLinks from '@substrate-system/catch-links'

// given a click on `#local-link`
CatchLinks(document.body, function onLinkClick (href) {
    // this will not be called on click to #remote-link

    console.log('href', href)
    // => '/foo'
})
```
