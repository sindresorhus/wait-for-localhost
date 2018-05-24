# wait-for-localhost [![Build Status](https://travis-ci.org/sindresorhus/wait-for-localhost.svg?branch=master)](https://travis-ci.org/sindresorhus/wait-for-localhost)

> Wait for localhost to be ready from the command-line and Node.js

Useful if you need a local server to be ready to accept requests before executing the next command.

I personally use this to wait for [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) to be ready before launching Electron.


## Install

```
$ npm install --global wait-for-localhost
```


## Usage

### CLI

```
$ wait-for-localhost --help

  Usage
    $ wait-for-localhost [port]

  Example
    $ wait-for-localhost 8080 && echo 'Server is ready'
```

### Node.js API

```
import waitForLocalhost from 'wait-for-localhost';

waitForLocalhost(8080).then(() => console.log('Server is ready'));
```

## Related

- [delay-cli](https://github.com/sindresorhus/delay-cli) - Delay execution for a given amount of seconds


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
