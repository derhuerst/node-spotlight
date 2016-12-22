#!/usr/bin/env node
'use strict'

const assert = require('assert')
const isStream = require('is-stream')

const spotlight = require('.')

const showError = (err) => {
	console.error(err.stack)
	process.exit(1)
	throw err
}

console.info('platform:', process.platform)



// todo
