import Configstore from 'configstore';

function getConfigStore({name} = {}) {
	if (!name) {
		throw new Error('Please specify the `name` option.');
	}

	return new Configstore(`first-run_${name}`, {firstRun: true});
}

export default function isFirstRun(options) {
	const configStore = getConfigStore(options);
	const isFirstRun = configStore.get('firstRun');

	if (isFirstRun === true) {
		configStore.set('firstRun', false);
	}

	return isFirstRun;
}

export function clearFirstRun(options) {
	getConfigStore(options).set('firstRun', true);
}
