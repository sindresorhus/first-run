'use strict';
var path = require('path');
var Configstore = require('configstore');
var readPkgUp = require('read-pkg-up');

function getConf(opts, pkg) {
	opts = opts || {};

	var name = opts.name;
	var version = opts.perVersion ? pkg.version : null;

	if (!name) {
		delete require.cache[__filename];
		name = readPkgUp.sync({cwd: path.dirname(module.parent.filename)}).pkg.name;
	}

	if (!name) {
		throw new Error('Couldn\'t infer the package name. Please specify it in the options.');
	}

	return new Configstore('first-run_' + name, {firstRun: {version, ran: false}});
}

function firstRun(opts) {
	var firstRun;
	var pkg = readPkgUp.sync({cwd: path.dirname(module.parent.filename)}).pkg;
	var conf = getConf(opts, pkg);
	var version = pkg.version;

	// perVersion mode
	if (opts && opts.perVersion) {
		var info = conf.get('firstRun');

		if (!info.ran) {
			conf.set('firstRun', {version, ran: true});
		}
	} else {
		// normal mode
		if (firstRun === undefined) {
			firstRun = !conf.get('firstRun.ran');
		}

		if (firstRun === true) {
			conf.set('firstRun.ran', true);
		}
	}

	return firstRun;
}

function clear(opts) {
	getConf(opts).set('firstRun.ran', false);
}

module.exports = firstRun;
module.exports.clear = clear;
