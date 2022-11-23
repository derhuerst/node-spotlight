'use strict'

const child = require('child_process')
const split = require('bsplit2/async-it')

const attributes = require('./attributes')

const ANYTHING = '.'
const DELIMITER = Buffer.from([0])

const spotlight = async function* (query, dir = null, attrs = []) {
	if (process.platform !== 'darwin')
		throw new Error(process.platform + ' is not supported.')
	if ('string' !== typeof query) throw new Error('query must be a string.')
	if (query.length === 0) throw new Error('query must not be empty.')
	if (dir && 'string' !== typeof dir) throw new Error('dir must be a string.')

	const args = [query || ANYTHING, '-0']
	if (dir) args.push('-onlyin', dir)
	for (let attr of attrs) args.push('-attr', attr)

	const search = child.spawn('mdfind', args, {
		// I don't know of any case where mdfind will write to stderr.
		// - With unknown flags, it prints the usage message to stdout.
		// - With a non-existent -onlyin dir, it will just exit normally.
		stdio: ['ignore', 'pipe', 'ignore']
	})

	let err
	search.once('error', (_err) => {
		err = _err
	})
	search.on('close', (status) => {
		if (status === 0) return;
		err = new Error('non-zero exit code')
		err.process = search
	})

	for await (const line of split(search.stdout, DELIMITER)) {
		// todo: throw immediately, we might be waiting for a line forever
		if (err) throw err

		const data = line.toString('utf8').split(/\s+(?=kMD)/)
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
		yield result
	}
}

spotlight.support = true

module.exports = spotlight
