'use strict';
var Configstore = require('configstore');
var firstRun = require('./');
var versionToCheck = "1.1";
(new Configstore('first-run_first-run')).clear();
firstRun();
var shouldBeTrue = firstRun({version: versionToCheck});
process.exit(shouldBeTrue ? 0 : 1);
