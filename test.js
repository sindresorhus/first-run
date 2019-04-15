'use strict';
const Configstore = require('configstore');
const firstRun = require('.');

(new Configstore('first-run_first-run')).clear();
// eslint-disable-next-line unicorn/no-process-exit
process.exit(firstRun() ? 0 : 1);
