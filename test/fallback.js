'use strict'

const tap = require('tap')

const fallback = require('../lib/fallback')

tap.test('fallback works', async (t) => {
	const s = fallback('sleep', '/bin')

	t.rejects(async () => {
		for await (const _ of s) _
	}, /not implemented/, 'should reject with "not implemented"')
})
