'use strict';
var path = require('path');
var Configstore = require('configstore');
var readPkgUp = require('read-pkg-up');

function getConf(opts) {
	opts = opts || {};

	var name = opts.name;

	if (!name) {
		delete require.cache[__filename];
		name = readPkgUp.sync({cwd: path.dirname(module.parent.filename)}).pkg.name;
	}

	if (!name) {
		throw new Error('Couldn\'t infer the package name. Please specify it in the options.');
	}

	// We add first runs based on versions
	return new Configstore('first-run_' + name, {[opts.version]: {firstRun: true}});
}

function firstRun(opts) {
	opts = opts || {};
	var version = opts.version = opts.version || _getVersion();
	version = version.replace(/\./g, '\\.'); // we need to replace the dots with '\\.' for dotProp
	var firstRun;
	var conf = getConf(opts);

	if (firstRun === undefined) {
		firstRun = conf.get(version + ".firstRun");
	}

	if (firstRun === true) {
		conf.set(version + '.firstRun', false);
	}

	return firstRun;
}

function clear(opts) {
	opts = opts || {};
	opts.version = opts.version || _getVersion();
	var version = opts.version.replace(/\./g, '\\.');
	getConf(opts).set(version + ".firstRun", true);
}

// get the version from package.json
function _getVersion() {
	return readPkgUp.sync({cwd: path.dirname(module.parent.filename)}).pkg.version;
}

module.exports = firstRun;
module.exports.clear = clear;
