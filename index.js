const http = require('http');

module.exports = (port, options) => {
	if (typeof port === 'object') {
		options = port;
		port = 80;
	}

	options = {
		method: 'HEAD',
		...options
	};

	return new Promise(resolve => {
		const retry = () => setTimeout(main, 200);

		const method = options.method.toUpperCase();

		const main = () => {
			const request = http.request({method, port}, response => {
				if (response.statusCode === 200) {
					return resolve();
				}

				retry();
			});

			request.on('error', retry);
			request.end();
		};

		main();
	});
};
