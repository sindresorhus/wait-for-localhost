const http = require('http');

const waitForLocalhost = options => {
	options = Object.assign({}, options);

	return new Promise(resolve => {
		const retry = () => setTimeout(main, 200);

		const method = options.useGet ? 'GET' : 'HEAD';

		const main = () => {
			const request = http.request({method, port: options.port}, response => {
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

module.exports = waitForLocalhost;
module.exports.default = waitForLocalhost;
