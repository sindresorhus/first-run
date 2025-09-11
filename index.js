import Configstore from 'configstore';

function getConfigStoreAndKey({name, version} = {}) {
	if (!name) {
		throw new Error('Please specify the `name` option.');
	}

	const configStore = new Configstore(`first-run_${name}`, {firstRun: true});
	const key = version ? `version_${version}` : 'firstRun';

	return {configStore, key};
}

export default function isFirstRun(options) {
	const {configStore, key} = getConfigStoreAndKey(options);
	const storedValue = configStore.get(key);

	// If key doesn't exist (undefined) or is true, it's the first run
	const isFirstRun = storedValue === undefined || storedValue === true;

	if (isFirstRun) {
		configStore.set(key, false);
	}

	return isFirstRun;
}

export function clearFirstRun(options) {
	const {configStore, key} = getConfigStoreAndKey(options);
	configStore.set(key, true);
}

export function isFirstRunForVersion(options) {
	if (!options?.version) {
		throw new Error('Please specify the `version` option.');
	}

	const {configStore, key} = getConfigStoreAndKey(options);
	const storedValue = configStore.get(key);

	// If key doesn't exist (undefined) or is true, it's the first run
	const isFirstRun = storedValue === undefined || storedValue === true;

	if (isFirstRun) {
		configStore.set(key, false);
	}

	return isFirstRun;
}

export function clearFirstRunForVersion(options) {
	if (!options?.version) {
		throw new Error('Please specify the `version` option.');
	}

	const {configStore, key} = getConfigStoreAndKey(options);
	configStore.set(key, true);
}
