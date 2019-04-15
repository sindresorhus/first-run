'use strict';
const Configstore = require('configstore');
const firstRun = require('.');

(new Configstore('first-run_first-run')).clear();
const shouldBeTrue = firstRun();
firstRun.clear();
const shouldBeTrueAgain = firstRun();
// eslint-disable-next-line unicorn/no-process-exit
process.exit(shouldBeTrue && shouldBeTrueAgain ? 0 : 1);
