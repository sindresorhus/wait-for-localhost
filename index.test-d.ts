import {expectType} from 'tsd';
import waitForLocalhost = require('.');

expectType<Promise<void>>(waitForLocalhost());
expectType<Promise<void>>(waitForLocalhost({port: 8080}));
expectType<Promise<void>>(waitForLocalhost({useGet: true}));
