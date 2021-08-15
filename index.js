import http from 'node:http';

export default function waitForLocalhost({port, path, useGet} = {}) {
	return new Promise(resolve => {
		const retry = () => {
			setTimeout(main, 200);
		};

		const method = useGet ? 'GET' : 'HEAD';

		const main = () => {
			const request = http.request({method, port, path}, response => {
				if (response.statusCode === 200) {
					resolve();
					return;
				}

				retry();
			});

			request.on('error', retry);
			request.end();
		};

		main();
	});
}
