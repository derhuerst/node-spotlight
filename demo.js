'use strict'

const spotlight = require('.')

;(async () => {
	const search = spotlight('example', null, [
		'kMDItemAuthors',
		'kMDItemContentType',
		'kMDItemFSInvisible',
		'kMDItemKind',
		'kMDItemNumberOfPages',
		'kMDItemTitle',
		'kMDItemUseCount',
		'kMDItemVersion',
	])
	for await (const result of search) console.log(result)
	console.log('done!')
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
