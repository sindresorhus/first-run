'use strict';
var Configstore = require('configstore');
var firstRun = require('./');
(new Configstore('first-run_first-run')).clear();
var shouldBeTrue = firstRun();
firstRun.clear();
var shouldBeTrueAgain = firstRun();
process.exit(shouldBeTrue && shouldBeTrueAgain ? 0 : 1);
