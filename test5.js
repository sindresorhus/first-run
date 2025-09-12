import process from 'node:process';
import Configstore from 'configstore';
import isFirstRun, {clearFirstRun, isFirstRunForVersion, clearFirstRunForVersion} from './index.js';

// Clear any existing state for test apps
new Configstore('first-run_test-app-special').clear();
new Configstore('first-run_test-app-empty').clear();

let success = true;

function test(description, fn) {
	try {
		fn();
	} catch (error) {
		console.error(`❌ ${description}: ${error.message}`);
		success = false;
	}
}

// Test that regular functions reject version parameter
test('isFirstRun should throw with version parameter', () => {
	try {
		isFirstRun({name: 'test-app', version: '1.0.0'});
		throw new Error('Should have thrown an error');
	} catch (error) {
		if (!error.message.includes('not supported')) {
			throw new Error(`Wrong error message: ${error.message}`);
		}
	}
});

test('clearFirstRun should throw with version parameter', () => {
	try {
		clearFirstRun({name: 'test-app', version: '1.0.0'});
		throw new Error('Should have thrown an error');
	} catch (error) {
		if (!error.message.includes('not supported')) {
			throw new Error(`Wrong error message: ${error.message}`);
		}
	}
});

// Test error handling for version functions
test('isFirstRunForVersion should throw without version', () => {
	try {
		isFirstRunForVersion({name: 'test-app'});
		throw new Error('Should have thrown an error');
	} catch (error) {
		if (!error.message.includes('version')) {
			throw new Error(`Wrong error message: ${error.message}`);
		}
	}
});

test('isFirstRunForVersion should throw with undefined version', () => {
	try {
		isFirstRunForVersion({name: 'test-app', version: undefined});
		throw new Error('Should have thrown an error');
	} catch (error) {
		if (!error.message.includes('version')) {
			throw new Error(`Wrong error message: ${error.message}`);
		}
	}
});

test('clearFirstRunForVersion should throw without version', () => {
	try {
		clearFirstRunForVersion({name: 'test-app'});
		throw new Error('Should have thrown an error');
	} catch (error) {
		if (!error.message.includes('version')) {
			throw new Error(`Wrong error message: ${error.message}`);
		}
	}
});

// Test edge cases with version strings
test('Version with special characters should work', () => {
	const specialVersion = '1.0.0-beta.1+build.123';
	const result1 = isFirstRunForVersion({name: 'test-app-special', version: specialVersion});
	if (result1 !== true) {
		throw new Error('First run should be true');
	}

	const result2 = isFirstRunForVersion({name: 'test-app-special', version: specialVersion});
	if (result2 !== false) {
		throw new Error('Second run should be false');
	}
});

test('Empty version string should work', () => {
	const result1 = isFirstRunForVersion({name: 'test-app-empty', version: ''});
	if (result1 !== true) {
		throw new Error('First run with empty version should be true');
	}

	const result2 = isFirstRunForVersion({name: 'test-app-empty', version: ''});
	if (result2 !== false) {
		throw new Error('Second run with empty version should be false');
	}
});

if (success) {
	console.log('✅ All edge case tests passed');
} else {
	console.log('❌ Some edge case tests failed');
}

// eslint-disable-next-line unicorn/no-process-exit
process.exit(success ? 0 : 1);
