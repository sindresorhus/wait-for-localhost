# wait-for-localhost

> Wait for localhost to be ready

Useful if you need a local server to be ready to accept requests before doing other things.

Supports both HTTP/1 and HTTP/2 servers with automatic fallback.

## Install

```sh
npm install wait-for-localhost
```

## Usage

```js
import waitForLocalhost from 'wait-for-localhost';

await waitForLocalhost({port: 8080});
console.log('Server is ready');
```

## API

### waitForLocalhost(options?)

Returns a `Promise<object>` that settles when localhost is ready.

The object contains an `ipVersion` property with a value of either `6` or `4` depending on the IP version that was used.

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

##### statusCodes

Type: `number[]`\
Default: `[200]`

HTTP status codes to consider as successful responses.

##### signal

Type: `AbortSignal`

An [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) to abort the operation.

```js
import waitForLocalhost from 'wait-for-localhost';

// Timeout after 5 seconds
await waitForLocalhost({
	port: 8080,
	signal: AbortSignal.timeout(5000)
});
```

## Related

- [wait-for-localhost-cli](https://github.com/sindresorhus/wait-for-localhost-cli) - CLI for this module
- [delay](https://github.com/sindresorhus/delay) - Delay execution for a given amount of seconds
