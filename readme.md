# node-spotlight

**Search macOS using Spotlight.**

[![npm version](https://img.shields.io/npm/v/node-spotlight.svg)](https://www.npmjs.com/package/node-spotlight)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/node-spotlight.svg)
![minimum Node.js version](https://img.shields.io/node/v/node-spotlight.svg)
[![support me via GitHub Sponsors](https://img.shields.io/badge/support%20me-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)
[![chat with me on Twitter](https://img.shields.io/badge/chat%20with%20me-on%20Twitter-1da1f2.svg)](https://twitter.com/derhuerst)


## Installing

```shell
npm install node-spotlight
```


## Usage

```js
spotlight(query, directory, attributes)
```

```js
const spotlight = require('node-spotlight')

const results = spotlight('bvg-wlan', null, [
	'kMDItemAuthors',
	'kMDItemContentType',
	'kMDItemFSInvisible',
	'kMDItemKind',
	'kMDItemNumberOfPages',
	'kMDItemTitle',
	'kMDItemUseCount',
	'kMDItemVersion',
])
for await (const result of results) {
	console.log('result', result)
}
```

```js
{
	path: '/Users/j/Downloads/bvg/bvg-wlan.pdf',
	kMDItemAuthors: ['BVG VBA-FGI Kartographie'],
	kMDItemContentType: 'com.adobe.pdf',
	kMDItemFSInvisible: false,
	kMDItemKind: 'Portable Document Format (PDF)',
	kMDItemNumberOfPages: 1,
	kMDItemTitle: 'S+U-Bahn_2901_2016_18-10_WLAN',
	kMDItemUseCount: 15,
	kMDItemVersion: '1.6'
}
// …
```


## API

```js
spotlight(query, dir = null, filters = [])
```

- `query` must be a string.
- `dir` is an optional string.
- `filters` is an optional array if attributes that should be filtered by.

Returns an [async iterator/iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols) of search results.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/node-spotlight/issues).
