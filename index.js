'use strict'

const
	Filter = require('broccoli-filter'),
	convertSourceMap = require('convert-source-map'),
	Compiler = require('mason-compile/dist/Compiler').default,
	compileWarnAndThrow = require('mason-node-util/dist/compile-warn-and-throw').default

/* eslint-disable consistent-return */
const MasonFilter = module.exports = function MasonFilter(inputTree, options) {
	if (!(this instanceof MasonFilter)) return new MasonFilter(inputTree, options)
	Filter.call(this, inputTree, options)
	this.compiler = new Compiler(options)
}
MasonFilter.prototype = Object.create(Filter.prototype)

Object.assign(MasonFilter.prototype, {
	constructor: MasonFilter,
	extensions: ['ms'],
	targetExtension: 'js',
	processString(code, filename) {
		// TODO:ES6 const {code, sourceMap} = ...
		const _ = compileWarnAndThrow(this.compiler, code, filename)
		return `${_.code}\n${convertSourceMap.fromObject(_.sourceMap).toComment()}`
	}
})
