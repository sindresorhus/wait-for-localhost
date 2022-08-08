import {expectType} from 'tsd';
import waitForLocalhost from './index.js';

expectType<Promise<{ipVersion: 4 | 6}>>(waitForLocalhost());
expectType<Promise<{ipVersion: 4 | 6}>>(waitForLocalhost({port: 8080}));
expectType<Promise<{ipVersion: 4 | 6}>>(waitForLocalhost({path: '/health'}));
expectType<Promise<{ipVersion: 4 | 6}>>(waitForLocalhost({useGet: true}));
