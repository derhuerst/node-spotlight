#!/usr/bin/env node
'use strict'

const assert = require('assert')
const isStream = require('is-stream')

const spotlight = require('..')

const showError = (err) => {
	console.error(err)
	process.exit(1)
	throw err
}

assert(isStream(spotlight('foo', __dirname)))

spotlight('sleep', '/bin')
.on('error', (err) => {
	assert.strictEqual(err.message.slice(-16), ' not implemented')
})
