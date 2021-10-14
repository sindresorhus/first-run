import process from 'node:process';
import Configstore from 'configstore';
import isFirstRun, {clearFirstRun} from './index.js';

const name = 'first-run';

(new Configstore(`first-run_${name}`)).clear();
const shouldBeTrue = isFirstRun({name});
clearFirstRun({name});
const shouldBeTrueAgain = isFirstRun({name});
// eslint-disable-next-line unicorn/no-process-exit
process.exit(shouldBeTrue && shouldBeTrueAgain ? 0 : 1);
