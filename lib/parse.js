'use strict'

const parseDate = (s) => new Date(s)
const parseString = (s) => {
	if (s[0] === '"' && s[s.length - 1] === '"') return s.slice(1, -1)
	return s
}
const parseBoolean = (s) => s.toLowerCase() === 'true'

const parseArray = (f) => (l, p) =>
	l.slice(2, -2)
	.split(',\n')
	.map((s) => s.replace(/^\s+/, ''))
	.map(f)

const parseArrayOfStrings = parseArray(parseString) // perf

module.exports = {
	parseDate, parseString, parseBoolean,
	parseArray, parseArrayOfStrings
}
