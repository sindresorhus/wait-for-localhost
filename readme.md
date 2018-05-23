# wait-for-localhost [![Build Status](https://travis-ci.org/sindresorhus/wait-for-localhost.svg?branch=master)](https://travis-ci.org/sindresorhus/wait-for-localhost)

> Wait for localhost to be ready from the command-line

Useful if you need a local server to be ready to accept requests before executing the next command.

I personally use this to wait for [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) to be ready before launching Electron.


## Install

```
$ npm install --global wait-for-localhost
```


## Usage

```
$ wait-for-localhost --help

  Usage
    $ wait-for-localhost [port]

  Options
    --interval  Interval in milliseconds to poll for localhost [Default: 200]

  Example
    $ wait-for-localhost 8080 && echo 'Server is ready'
```


## Related

- [delay-cli](https://github.com/sindresorhus/delay-cli) - Delay execution for a given amount of seconds


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
