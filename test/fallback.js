'use strict'

const tap = require('tap')
const isStream = require('is-stream')

const fallback = require('../lib/fallback')

tap.test('fallback works', async (t) => {
	const s = fallback('sleep', '/bin')
	t.ok(isStream(s), 'must be a stream')

	const err = await new Promise((resolve) => {
		s.on('data', () => {}) // start consuming the stream
		s.once('error', resolve)
	})
	t.ok(err.message.includes('not implemented'), 'error message should say "not implemented"')
})
