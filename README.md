# catch links
[![tests](https://github.com/bicycle-codes/catch-links/actions/workflows/nodejs.yml/badge.svg)](https://github.com/bicycle-codes/catch-links/actions/workflows/nodejs.yml)
[![Socket Badge](https://socket.dev/api/badge/npm/package/@bicycle-codes/catch-links)](https://socket.dev/npm/package/@bicycle-codes/catch-links)
[![types](https://img.shields.io/npm/types/@bicycle-codes/catch-links?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

Like the classic [@substack module](https://www.npmjs.com/package/catch-links), but updated.

Intercept local link clicks on a page, for client-side pushState UIs.

This is used as a part of [route-event](https://github.com/bicycle-codes/route-event). That is the recommended way to consume this.

## install
```sh
npm i -S @bicycle-codes/catch-links
```

## use

### common JS
```js
const catchLinks = require('@bicycle-codes/catch-links').default
```

### ESM
```js
import CatchLinks from '@bicycle-codes/catch-links'
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
import CatchLinks from '@bicycle-codes/catch-links'

// given a click on `#local-link`
CatchLinks(document.body, function onLinkClick (href) {
    // this will not be called on click to #remote-link

    console.log('href', href)
    // => '/foo'
})
```
