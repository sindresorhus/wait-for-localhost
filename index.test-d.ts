import {expectType} from 'tsd-check';
import waitForLocalhost from '.';

expectType<Promise<void>>(waitForLocalhost());
expectType<Promise<void>>(waitForLocalhost({port: 8080}));
expectType<Promise<void>>(waitForLocalhost({useGet: true}));
