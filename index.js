'use strict';
const path = require('path');
const Configstore = require('configstore');
const readPkgUp = require('read-pkg-up');

const getConfigStoreAndKey = (options = {}) => {
	let {name, version, detectVersion} = options;

	if (!name) {
		delete require.cache[__filename];
		const {pkg} = readPkgUp.sync({cwd: path.dirname(module.parent.filename)});
		name = pkg.name;

		if (!name) {
			throw new Error('Couldn\'t infer the package name. Please specify it in the options.');
		}

		if (detectVersion) {
			version = pkg.version;
		}
	}

	if (!version) {
		version = undefined;
	}

	const configStore = new Configstore(`first-run_${name}`, {firstRun: true});
	const key = version === undefined ? 'firstRun' : `firstRunVersion.${version}`;
	return {configStore, key};
};

function firstRun(options) {
	const {configStore, key} = getConfigStoreAndKey(options);

	const configFirstRun = configStore.get(key);
	const firstRun = configFirstRun === undefined || configFirstRun === true;
	if (firstRun) {
		configStore.set({
			firstRun: false,
			[key]: false
		});
	}

	return firstRun;
}

function clear(options) {
	const {configStore, key} = getConfigStoreAndKey(options);

	configStore.set({
		firstRun: true,
		[key]: true
	});
}

module.exports = firstRun;
module.exports.clear = clear;
