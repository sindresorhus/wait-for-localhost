import http from 'node:http';

export default function waitForLocalhost({port, path, useGet} = {}) {
	return new Promise(resolve => {
		const retry = () => {
			setTimeout(main, 200);
		};

		const method = useGet ? 'GET' : 'HEAD';

		const doRequest = (family, next) => {
			const request = http.request({method, port, path, family}, response => {
				if (response.statusCode === 200) {
					resolve({family});
					return;
				}

				next();
			});

			request.on('error', next);
			request.end();
		};

		const main = () => {
			doRequest(4,
				() => doRequest(6,
					() => retry(),
				),
			);
		};

		main();
	});
}
