import process from 'node:process';
import Configstore from 'configstore';
import isFirstRun, {clearFirstRun, isFirstRunForVersion, clearFirstRunForVersion} from './index.js';

const name = 'first-run-version-test';

// Clear any existing state
new Configstore(`first-run_${name}`).clear();

let success = true;

function test(description, condition) {
	if (!condition) {
		console.error(`❌ ${description}`);
		success = false;
	}
}

// Test 1: Regular isFirstRun behavior (unchanged)
test('Regular first run should return true', isFirstRun({name}) === true);
test('Regular second run should return false', isFirstRun({name}) === false);

// Test 2: Version tracking is independent from regular tracking
test(
	'Version 1.0.0 first run should return true (independent)',
	isFirstRunForVersion({name, version: '1.0.0'}) === true,
);

test(
	'Version 1.0.0 second run should return false',
	isFirstRunForVersion({name, version: '1.0.0'}) === false,
);

// Test 3: Different versions are tracked separately
test(
	'Version 2.0.0 first run should return true (different version)',
	isFirstRunForVersion({name, version: '2.0.0'}) === true,
);

test(
	'Version 2.0.0 second run should return false',
	isFirstRunForVersion({name, version: '2.0.0'}) === false,
);

// Test 4: Version 1.0.0 should still be false
test(
	'Version 1.0.0 should still be false after 2.0.0 usage',
	isFirstRunForVersion({name, version: '1.0.0'}) === false,
);

// Test 5: Clear version-specific state
clearFirstRunForVersion({name, version: '1.0.0'});
test(
	'Version 1.0.0 should return true after clear',
	isFirstRunForVersion({name, version: '1.0.0'}) === true,
);

// Test 6: Other states unaffected by version-specific clear
test(
	'Version 2.0.0 should still be false after clearing 1.0.0',
	isFirstRunForVersion({name, version: '2.0.0'}) === false,
);

test(
	'Regular tracking should still be false after clearing version-specific',
	isFirstRun({name}) === false,
);

// Test 7: Clear regular state doesn't affect version tracking
clearFirstRun({name});
test('Regular tracking should return true after clear', isFirstRun({name}) === true);
test(
	'Version 1.0.0 should be false after clearing regular (was already run)',
	isFirstRunForVersion({name, version: '1.0.0'}) === false,
);

// eslint-disable-next-line unicorn/no-process-exit
process.exit(success ? 0 : 1);
