'use strict';
var Configstore = require('configstore');
var firstRun = require('./');
(new Configstore('first-run_first-run')).clear();
var shouldBeTrue = firstRun({perVersion: true});
var shouldBeFalse = firstRun();
process.exit(shouldBeFalse ? 1 : 0);
