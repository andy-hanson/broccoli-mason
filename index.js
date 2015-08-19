'use strict'

const
	Filter = require('broccoli-filter'),
	convertSourceMap = require('convert-source-map'),
	compileWarnAndThrow = require('mason-node-util/dist/compile-warn-and-throw').default

const MasonFilter = module.exports = function MasonFilter(inputTree, options) {
	if (!(this instanceof MasonFilter)) return new MasonFilter(inputTree, options)
	Filter.call(this, inputTree, options)
	this.options = options
}
MasonFilter.prototype = Object.create(Filter.prototype)

Object.assign(MasonFilter.prototype, {
	constructor: MasonFilter,
	extensions: ['ms'],
	targetExtension: 'js',
	processString(string, inFile) {
		const opts = Object.assign({inFile}, this.options)
		const _ = compileWarnAndThrow(string, inFile, opts)
		return `${_.code}\n${convertSourceMap.fromObject(_.sourceMap).toComment()}`
	}
})
