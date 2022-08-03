import {expectType} from 'tsd';
import waitForLocalhost from './index.js';

expectType<Promise<{family: 4|6}>>(waitForLocalhost());
expectType<Promise<{family: 4|6}>>(waitForLocalhost({port: 8080}));
expectType<Promise<{family: 4|6}>>(waitForLocalhost({path: '/health'}));
expectType<Promise<{family: 4|6}>>(waitForLocalhost({useGet: true}));
