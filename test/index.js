'use strict'

console.info('platform:', process.platform)

if (process.platform === 'darwin')
	require('./spotlight')
else
	require('./fallback')
