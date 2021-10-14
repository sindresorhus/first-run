import process from 'node:process';
import isFirstRun from './index.js';

// eslint-disable-next-line unicorn/no-process-exit
process.exit(isFirstRun({name: 'first-run'}) ? 1 : 0);
