'use strict'

if (process.platform === 'darwin')
	module.exports = require('./lib/spotlight')
else
	module.exports = require('./lib/fallback')
