import process from 'node:process';
import Configstore from 'configstore';
import isFirstRun from './index.js';

(new Configstore('first-run_first-run')).clear();

// eslint-disable-next-line unicorn/no-process-exit
process.exit(isFirstRun({name: 'first-run'}) ? 0 : 1);
