# wait-for-localhost [![Build Status](https://travis-ci.org/sindresorhus/wait-for-localhost.svg?branch=master)](https://travis-ci.org/sindresorhus/wait-for-localhost)

> Wait for localhost to be ready

Useful if you need a local server to be ready to accept requests before doing other things.


## Install

```
$ npm install --global wait-for-localhost
```


## Usage

```js
const waitForLocalhost = require('wait-for-localhost');

(async () => {
	await waitForLocalhost({port: 8080});
	console.log('Server is ready');
})();
```


## API

### waitForLocalHost([options])

Returns a `Promise` that settles when localhost is ready.

#### options

Type: `Object`

##### port

Type: `number`<br>
Default: `80`

##### path

Type: `string`<br>
Default: `/`

##### useGet

Type: `boolean`<br>
Default: `false`

Use the `GET` HTTP-method instead of `HEAD` to check if the server is running.


## Related

- [wait-for-localhost-cli](https://github.com/sindresorhus/wait-for-localhost-cli) - CLI for this module
- [delay](https://github.com/sindresorhus/delay) - Delay execution for a given amount of seconds


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
