#!/usr/bin/env node
'use strict'

const assert = require('assert')
const isStream = require('is-stream')

const fallback = require('../lib/fallback')



const s = fallback('sleep', '/bin')

assert(isStream(s))

s.on('error', (err) => {
	assert.strictEqual(err.message.slice(-16), ' not implemented')
})
