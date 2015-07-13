'use strict';
var path = require('path');
var Configstore = require('configstore');
var lookup = require('look-up');
var firstRun;

module.exports = function (opts) {
	opts = opts || {};

	var name = opts.name;

	if (!name) {
		delete require.cache[__filename];
		name = require(lookup('package.json', {
			cwd: path.dirname(module.parent.filename)
		})).name;
	}

	var conf = new Configstore('first-run_' + name, {firstRun: true});

	if (firstRun === undefined) {
		firstRun = conf.get('firstRun');
	}

	if (firstRun === true) {
		conf.set('firstRun', false);
	}

	return firstRun;
};
