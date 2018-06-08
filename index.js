const http = require('http');

module.exports = port =>
	new Promise(resolve => {
		const retry = () => setTimeout(main, 200); // eslint-disable-line no-use-before-define

		const main = () => {
			const request = http.request({method: 'HEAD', port}, response => {
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
