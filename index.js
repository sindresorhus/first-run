'use strict';
const path = require('path');
const Configstore = require('configstore');
const readPkgUp = require('read-pkg-up');

function getConfigStore(options = {}) {
	let {name} = options;

	if (!name) {
		delete require.cache[__filename];
		name = readPkgUp.sync({cwd: path.dirname(module.parent.filename)}).pkg.name;
	}

	if (!name) {
		throw new Error('Couldn\'t infer the package name. Please specify it in the options.');
	}

	return new Configstore(`first-run_${name}`, {firstRun: true});
}

function firstRun(options) {
	const configStore = getConfigStore(options);
	const firstRun = configStore.get('firstRun');

	if (firstRun === true) {
		configStore.set('firstRun', false);
	}

	return firstRun;
}

function clear(options) {
	getConfigStore(options).set('firstRun', true);
}

module.exports = firstRun;
module.exports.clear = clear;
