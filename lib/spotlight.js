'use strict'

const child = require('child_process')
const split = require('binary-split')
const map = require('through2-map')

const attributes = require('./attributes')



const spotlight = (query, dir = null, attrs = []) => {
	if (process.platform !== 'darwin')
		throw new Error(process.platform + ' is not supported.')
	if ('string' !== typeof query) throw new Error('query must be a string.')
	if (dir && 'string' !== typeof dir) throw new Error('dir must be a string.')

	const args = [query, '-0']
	if (dir) args.push('-onlyin', dir)
	for (let attr of attrs) args.push('-attr', attr)

	const search = child.spawn('mdfind', args, {
		stdio: ['ignore', 'pipe', 'ignore']
	})

	const results = search.stdout
	.pipe(split('\0'))
	.pipe(map.obj((row) => {
		const data = row.toString('utf8').split(/\s+(?=kMD)/)
		const result = {path: data[0]}

		for (let i = 0; i < attrs.length; i++) {
			const attr = attrs[i]
			let value = data[i + 1]

			// strip attr prefix from value
			const begin = attr + ' = '
			if (value.slice(0, begin.length) === begin)
				value = value.slice(begin.length)

			// parse value
			if (value === '(null)') value = null
			else if (attributes[attr]) value = attributes[attr](value)

			result[attr] = value
		}
		return result
	}))

	search.on('close', (status) => {
		if (status > 0)
			results.emit('error', new Error('non-zero exit code'))
	})

	return results
}

module.exports = spotlight
