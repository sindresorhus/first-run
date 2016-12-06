'use strict';
var Configstore = require('configstore');
var firstRun = require('./');
(new Configstore('first-run_first-run')).clear();
var shouldBeTrue = firstRun({perVersion: true});
process.exit(shouldBeTrue ? 0 : 1);
