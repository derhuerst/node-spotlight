'use strict'

const spotlight = require('.')

spotlight('example', null, [
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
.on('end', () => console.log('done!'))
.once('error', (err) => {
	console.error(err)
	process.exit(1)
})
