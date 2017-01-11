'use strict'

const spotlight = require('.')

spotlight('bvg-wlan', null, [
	'kMDItemAuthors',
	'kMDItemContentType',
	'kMDItemFSInvisible',
	'kMDItemKind',
	'kMDItemNumberOfPages',
	'kMDItemTitle',
	'kMDItemUseCount',
	'kMDItemVersion',
])
.on('data', (d) => console.log('result', d))
.on('error', (e) => console.log('error', e))
