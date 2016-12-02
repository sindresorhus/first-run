'use strict';
var Configstore = require('configstore');
var firstRun = require('./');
var previouslyRanVersion = '1\\.2\\.1.firstRun';
(new Configstore('first-run_first-run')).clear();
(new Configstore('first-run_first-run')).set(previouslyRanVersion, false);
var shouldBeFalse = firstRun({version: '1.2.1'});
process.exit(shouldBeFalse ? 1 : 0);
