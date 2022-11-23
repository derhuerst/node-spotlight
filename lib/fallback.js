/* eslint require-yield: "off" */
'use strict'

const fallback = async function* () {
	throw new Error(process.platform + ' is not implemented')
}

fallback.support = false

module.exports = fallback
