const {exec} = require('child_process');

const test = require('ava');
const Configstore = require('configstore');
const firstRun = require('.');

const execAndGetCode = command => new Promise(resolve => {
	exec(command, error => {
		if (error === null) {
			resolve(0);
		} else {
			resolve(error.code);
		}
	});
});

test.serial('main', t => {
	new Configstore('first-run_first-run').clear();
	t.true(firstRun());
	t.false(firstRun());
});

test.serial('clear', t => {
	firstRun();
	t.false(firstRun());
	firstRun.clear();
	t.true(firstRun());
});

test.serial('separate processes', async t => {
	t.is(await execAndGetCode('node fixture/test1.js'), 0);
	t.is(await execAndGetCode('node fixture/test2.js'), 0);
	t.is(await execAndGetCode('node fixture/test3.js'), 0);
});

test.serial('version', t => {
	new Configstore('first-run_first-run-test').clear();

	t.true(firstRun({name: 'first-run-test', version: '1.0.0'}));
	t.false(firstRun({name: 'first-run-test', version: '1.0.0'}));
	t.true(firstRun({name: 'first-run-test', version: '2.0.0'}));
	t.false(firstRun({name: 'first-run-test', version: '2.0.0'}));
});

test.serial('no-version to version ', t => {
	new Configstore('first-run_first-run-test').clear();

	t.true(firstRun({name: 'first-run-test'}));
	t.false(firstRun({name: 'first-run-test'}));
	t.true(firstRun({name: 'first-run-test', version: '1.0.0'}));
	t.false(firstRun({name: 'first-run-test', version: '1.0.0'}));
});

test.serial('version to no-version', t => {
	new Configstore('first-run_first-run-test').clear();

	t.true(firstRun({name: 'first-run-test', version: '1.0.0'}));
	t.false(firstRun({name: 'first-run-test', version: '1.0.0'}));
	t.false(firstRun({name: 'first-run-test'}));
	firstRun.clear({name: 'first-run-test'});
	t.true(firstRun({name: 'first-run-test'}));
});
