# wait-for-localhost

> Wait for localhost to be ready

Useful if you need a local server to be ready to accept requests before doing other things.

## Install

```
$ npm install wait-for-localhost
```

## Usage

```js
import waitForLocalhost from 'wait-for-localhost';

await waitForLocalhost({port: 8080});
console.log('Server is ready');
```

## API

### waitForLocalHost(options?)

Returns a `Promise` that settles when localhost is ready.

#### options

Type: `object`

##### port

Type: `number`\
Default: `80`

##### path

Type: `string`\
Default: `'/'`

Use a custom path.

For example, `/health` for a health-check endpoint.

##### useGet

Type: `boolean`\
Default: `false`

Use the `GET` HTTP-method instead of `HEAD` to check if the server is running.

## Related

- [wait-for-localhost-cli](https://github.com/sindresorhus/wait-for-localhost-cli) - CLI for this module
- [delay](https://github.com/sindresorhus/delay) - Delay execution for a given amount of seconds
