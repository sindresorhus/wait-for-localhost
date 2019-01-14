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
	await waitForLocalhost(8080);
	console.log('Server is ready');
})();
```


## API

### waitForLocalHost([port], [options])

Returns a `Promise` that settles when localhost is ready.

#### port

Type: `number`<br>
Default: `80`

#### options

##### method

Type: `string`<br>
Default: `HEAD`


## Related

- [wait-for-localhost-cli](https://github.com/sindresorhus/wait-for-localhost-cli) - CLI for this module
- [delay](https://github.com/sindresorhus/delay) - Delay execution for a given amount of seconds


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
