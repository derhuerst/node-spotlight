#!/usr/bin/env node
'use strict'

const assert = require('assert')
const isStream = require('is-stream')
const sink = require('stream-sink')

const spotlight = require('..')

const showError = (err) => {
	console.error(err)
	process.exit(1)
	throw err
}

assert(isStream(spotlight('foo', __dirname)))

spotlight('sleep', '/bin')
.on('error', (err) => {
	assert.strictEqual(err.message.slice(-17), ' is not supported')
})
.pipe(sink('object'))
.then((results) => {
	assert.strictEqual(results.length, 0)
})
.catch(showError)
