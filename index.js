import http from 'node:http';
import http2 from 'node:http2';

const RETRY_DELAY = 200;
const HTTP1_ATTEMPTS = 6; // 3 rounds × 2 IP versions

export default function waitForLocalhost({port = 80, path = '/', useGet, statusCodes = [200]} = {}) {
	return new Promise(resolve => {
		let attemptCount = 0;
		const method = useGet ? 'GET' : 'HEAD';

		const handleSuccess = ipVersion => {
			resolve({ipVersion});
		};

		const handleResponse = (statusCode, ipVersion, onError) => {
			if (statusCodes.includes(statusCode)) {
				handleSuccess(ipVersion);
			} else {
				onError();
			}
		};

		const tryHttp1 = (ipVersion, onError) => {
			const request = http.request({
				method,
				port,
				path,
				family: ipVersion,
			}, response => {
				handleResponse(response.statusCode, ipVersion, onError);
			});

			request.on('error', onError);
			request.end();
		};

		const tryHttp2 = (ipVersion, onError) => {
			const hostname = ipVersion === 6 ? '[::1]' : 'localhost';
			const client = http2.connect(`http://${hostname}:${port}`);

			const cleanup = () => {
				if (!client.destroyed) {
					client.destroy();
				}
			};

			const handleError = () => {
				cleanup();
				onError();
			};

			client.on('error', handleError);

			const request = client.request({
				':method': method,
				':path': path,
			});

			request.on('response', headers => {
				cleanup();
				handleResponse(headers[':status'], ipVersion, onError);
			});

			request.on('error', handleError);
			request.end();
		};

		const tryRequest = (ipVersion, onError) => {
			const useHttp2 = attemptCount > HTTP1_ATTEMPTS;
			const requestFunction = useHttp2 ? tryHttp2 : tryHttp1;
			requestFunction(ipVersion, onError);
		};

		const retry = () => {
			setTimeout(attempt, RETRY_DELAY);
		};

		const attempt = () => {
			attemptCount++;
			tryRequest(4, () => {
				tryRequest(6, retry);
			});
		};

		attempt();
	});
}
