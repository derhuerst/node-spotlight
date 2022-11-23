#!/usr/bin/env node
'use strict'

const assert = require('assert')
const timeout = require('p-timeout')
const isStream = require('is-stream')
const sink = require('stream-sink')

const spotlight = require('../lib/spotlight')

const showError = (err) => {
	console.error(err)
	process.exit(1)
	throw err
}

const isString = (s) => 'string' === typeof s
const isNumber = (s) => 'number' === typeof s
const isBoolean = (s) => 'boolean' === typeof s
const isDate = (d) =>
	d && d.toISOString && d.valueOf() === new Date(d.toISOString()).valueOf()

// We assume these attributes exist for every search result.
const attributes = {
	kMDItemContentType: isString,
	kMDItemDateAdded: isDate,
	kMDItemDisplayName: isString,
	kMDItemFSInvisible: isBoolean,
	kMDItemFSIsExtensionHidden: isBoolean,
	kMDItemFSLabel: isNumber,
	kMDItemFSName: isString,
	kMDItemFSOwnerGroupID: isNumber,
	kMDItemFSOwnerUserID: isNumber,
	kMDItemFSSize: isNumber,
	kMDItemFSTypeCode: isString,
	kMDItemKind: isString,
	kMDItemPhysicalSize: isNumber
}



assert(isStream(spotlight('foo', __dirname)))

timeout(
	spotlight('safari', '/Applications')
	.on('error', assert.ifError)
	.pipe(sink('object'))
, 3000)
.then((results) => {
	assert(results.length > 0)
	for (let result of results) {
		assert.deepStrictEqual(Object.keys(result), ['path'])
		assert.strictEqual(typeof result.path, 'string')
	}

	const safari = results.find((result) => result.path === '/Applications/Safari.app')
	assert(safari)
	console.info('✓ /Applications/Safari.app')
})
.catch(showError)

timeout(
	spotlight('safari', '/Applications', Object.keys(attributes))
	.on('error', assert.ifError)
	.pipe(sink('object'))
, 3000)
.then((results) => {
	for (let result of results) {
		for (let attr in attributes) {
			const validator = attributes[attr]
			assert(validator(result[attr]), `${attr} of ${result.path} invalid`)
		}
	}

	const safari = results.find((result) => result.path === '/Applications/Safari.app')
	assert(safari)
	assert.strictEqual(safari.kMDItemContentType, 'com.apple.application-bundle')
	assert.strictEqual(safari.kMDItemKind, 'Application')

	console.info('✓ /Applications/Safari.app with specific attributes')
})
.catch(showError)
