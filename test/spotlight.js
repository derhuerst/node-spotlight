'use strict'

const tap = require('tap')
const isStream = require('is-stream')
const sink = require('stream-sink')

const spotlight = require('../lib/spotlight')

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

tap.test('finds Safari.app in /Applications', async (t) => {
	const s = spotlight('safari', '/Applications')
	t.ok(isStream(s), 'should be a stream')
	s.on('error', t.ifError)
	const results = await s.pipe(sink('object'))

	for (let result of results) {
		t.same(Object.keys(result), ['path'])
		t.equal(typeof result.path, 'string')
	}

	const safari = results.find((result) => result.path === '/Applications/Safari.app')
	t.ok(safari, 'should find /Applications/Safari.app')
})

tap.test('finds Safari.app in /Applications, with attributes', async (t) => {
	const s = spotlight('safari', '/Applications', Object.keys(attributes))
	t.ok(isStream(s), 'should be a stream')
	s.on('error', t.ifError)
	const results = await s.pipe(sink('object'))

	for (let result of results) {
		for (let attr in attributes) {
			const validator = attributes[attr]
			t.ok(validator(result[attr]), `${attr} of ${result.path} invalid`)
		}
	}

	const safari = results.find((result) => result.path === '/Applications/Safari.app')
	t.ok(safari, 'should find /Applications/Safari.app')
	t.equal(safari.kMDItemContentType, 'com.apple.application-bundle')
	t.equal(safari.kMDItemKind, 'Application')
})
