'use strict'

const ReadableStream = require('stream').Readable

module.exports = () => {
	const out = new ReadableStream({objectMode: true})
	setImmediate(() => {
		out.emit('error', new Error(process.platform + ' is not implemented'))
		out.end()
	})
	return out
}
