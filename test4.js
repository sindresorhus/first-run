'use strict';
var Configstore = require('configstore');
var firstRun = require('./');
var versionSecondRun = "1\\.2\\.1.firstRun";
(new Configstore('first-run_first-run')).clear();
firstRun();
(new Configstore('first-run_first-run')).set(versionSecondRun, true);
var shouldBeTrue = firstRun({version: "1.2.2"});
console.log(shouldBeTrue)
process.exit(shouldBeTrue ? 0 : 1);
