import Configstore from 'configstore';

function getConfigStoreAndKey({name, version} = {}) {
	if (!name) {
		throw new Error('Please specify the `name` option.');
	}

	const configStore = new Configstore(`first-run_${name}`, {firstRun: true});
	const key = version ? `version_${version}` : 'firstRun';

	return {configStore, key};
}

function checkFirstRun({configStore, key}) {
	const storedValue = configStore.get(key);

	// If key doesn't exist (undefined) or is true, it's the first run
	const isFirstRun = storedValue === undefined || storedValue === true;

	if (isFirstRun) {
		configStore.set(key, false);
	}

	return isFirstRun;
}

export default function isFirstRun(options) {
	if (options?.version !== undefined) {
		throw new Error('The `version` option is not supported. Use `isFirstRunForVersion()` instead.');
	}

	const {configStore, key} = getConfigStoreAndKey(options);
	return checkFirstRun({configStore, key});
}

export function clearFirstRun(options) {
	if (options?.version !== undefined) {
		throw new Error('The `version` option is not supported. Use `clearFirstRunForVersion()` instead.');
	}

	const {configStore, key} = getConfigStoreAndKey(options);
	configStore.set(key, true);
}

export function isFirstRunForVersion(options) {
	if (options?.version === undefined) {
		throw new Error('Please specify the `version` option.');
	}

	const {configStore, key} = getConfigStoreAndKey(options);
	return checkFirstRun({configStore, key});
}

export function clearFirstRunForVersion(options) {
	if (options?.version === undefined) {
		throw new Error('Please specify the `version` option.');
	}

	const {configStore, key} = getConfigStoreAndKey(options);
	configStore.set(key, true);
}
