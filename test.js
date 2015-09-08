'use strict';
var Configstore = require('configstore');
var firstRun = require('./');
(new Configstore('first-run_first-run')).clear();
process.exit(firstRun() ? 0 : 1);
