'use strict';
var Configstore = require('configstore');
var firstRun = require('./');
(new Configstore('first-run_first-run')).clear();
firstRun();
var shouldBeFalse = firstRun({perVersion: true});
process.exit(shouldBeFalse ? 1 : 0);
