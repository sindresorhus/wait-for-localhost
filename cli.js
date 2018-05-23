#!/usr/bin/env node
'use strict';
const http = require('http');
const meow = require('meow');

const cli = meow(`
	Usage
	  $ wait-for-localhost [port]

	Example
	  $ wait-for-localhost 8080 && echo 'Server is ready'
`, {
	input: {
		type: 'number',
		default: 80
	}
});

const [port] = cli.input;

const retry = () => setTimeout(main, 200); // eslint-disable-line no-use-before-define

const main = () => {
	const request = http.request({method: 'HEAD', port}, response => {
		if (response.statusCode === 200) {
			process.exit(0);
		}

		retry();
	});

	request.on('error', retry);
	request.end();
};

main();
