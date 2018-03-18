'use strict'

const ReadableStream = require('stream').Readable

const fallback = () => {
	const err = new Error(process.platform + ' is not implemented')

	return new ReadableStream({
		objectMode: true,
		read: function () {
			this.destroy(err)
		}
	})
}

fallback.support = false

module.exports = fallback
