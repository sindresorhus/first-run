import {expectType} from 'tsd';
import isFirstRun, {clearFirstRun, isFirstRunForVersion, clearFirstRunForVersion} from './index.js';

expectType<boolean>(isFirstRun({name: 'foo'}));
expectType<boolean>(isFirstRunForVersion({name: 'foo', version: '1.0.0'}));

clearFirstRun({name: 'foo'});
clearFirstRunForVersion({name: 'foo', version: '1.0.0'});
