import {expectType} from 'tsd';
import firstRun = require('.');

expectType<boolean>(firstRun());
expectType<boolean>(firstRun({name: 'foo'}));

firstRun.clear();
firstRun.clear({name: 'foo'});
