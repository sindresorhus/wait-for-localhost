import {expectType} from 'tsd';
import waitForLocalhost from './index.js';

expectType<Promise<void>>(waitForLocalhost());
expectType<Promise<void>>(waitForLocalhost({port: 8080}));
expectType<Promise<void>>(waitForLocalhost({path: '/health'}));
expectType<Promise<void>>(waitForLocalhost({useGet: true}));
