'use strict'

const ReadableStream = require('stream').Readable

const fallback = () => {
	const out = new ReadableStream({objectMode: true})
	setImmediate(() => {
		out.emit('error', new Error(process.platform + ' is not implemented'))
		out.emit('close')
	})
	return out
}

fallback.support = false

module.exports = fallback
