#!/usr/bin/env node
'use strict';
const meow = require('meow');
const waitForLocalhost = require('.');

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

(async () => {
	try {
		await waitForLocalhost(port);
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(2);
	}
})();
