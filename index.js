import http from 'node:http';
import http2 from 'node:http2';

export default function waitForLocalhost({port, path, useGet, statusCodes = [200]} = {}) {
	return new Promise(resolve => {
		let attemptCount = 0;
		const method = useGet ? 'GET' : 'HEAD';
		const targetPath = path || '/';

		const tryRequest = (protocol, ipVersion, onError) => {
			if (protocol === 'http1') {
				const request = http.request({
					method,
					port,
					path,
					family: ipVersion,
				}, response => {
					if (statusCodes.includes(response.statusCode)) {
						resolve({ipVersion});
					} else {
						onError();
					}
				});

				request.on('error', onError);
				request.end();
			} else {
				const hostname = ipVersion === 6 ? '[::1]' : 'localhost';
				const client = http2.connect(`http://${hostname}:${port || 80}`);

				const cleanup = () => {
					if (!client.closed) {
						client.close();
					}
				};

				const handleError = () => {
					cleanup();
					onError();
				};

				client.on('error', handleError);

				const request = client.request({
					':method': method,
					':path': targetPath,
				});

				request.on('response', headers => {
					const statusCode = headers[':status'];
					cleanup();

					if (statusCodes.includes(statusCode)) {
						resolve({ipVersion});
					} else {
						onError();
					}
				});

				request.on('error', handleError);
				request.end();
			}
		};

		const retry = () => {
			setTimeout(attempt, 200);
		};

		const attempt = () => {
			attemptCount++;

			// Try HTTP/1 first (3 rounds), then HTTP/2
			const useHttp2 = attemptCount > 6; // 3 attempts × 2 IP versions
			const protocol = useHttp2 ? 'http2' : 'http1';

			tryRequest(protocol, 4, () => {
				tryRequest(protocol, 6, retry);
			});
		};

		attempt();
	});
}
