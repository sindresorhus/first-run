'use strict';
var Configstore = require('configstore');
var firstRun = require('./');
var version = "1.2.3";
(new Configstore('first-run_first-run')).clear();
var shouldBeTrue = firstRun();
(new Configstore('first-run_first-run')).set('firstRun', {version, ran: false})
var shouldAlsoBeTrue = firstRun({perVersion: true});
process.exit(shouldBeTrue && shouldAlsoBeTrue ? 0 : 1);
