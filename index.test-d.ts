import {expectType} from 'tsd';
import isFirstRun, {clearFirstRun} from './index.js';

expectType<boolean>(isFirstRun({name: 'foo'}));

clearFirstRun({name: 'foo'});
