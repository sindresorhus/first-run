'use strict';
const firstRun = require('.');

// eslint-disable-next-line unicorn/no-process-exit
process.exit(firstRun() ? 1 : 0);
