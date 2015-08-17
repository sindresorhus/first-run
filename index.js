'use strict';
var path = require('path');
var Configstore = require('configstore');
var lookup = require('look-up');

function getConf(opts) {
	opts = opts || {};
	var name = opts.name;
	if (!name) {
		delete require.cache[__filename];
		name = require(lookup('package.json', {
			cwd: path.dirname(module.parent.filename)
		})).name;
	}
	return new Configstore('first-run_' + name, {firstRun: true});
}

function firstRun(opts) {
	var firstRun;
	var conf = getConf(opts);
	if (firstRun === undefined) {
		firstRun = conf.get('firstRun');
	}
	if (firstRun === true) {
		conf.set('firstRun', false);
	}
	return firstRun;
}

function clear(opts) {
	getConf(opts).set('firstRun', true);
}

module.exports = firstRun;
module.exports.clear = clear;
