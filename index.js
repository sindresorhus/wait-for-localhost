import http from 'node:http';
import http2 from 'node:http2';

const RETRY_DELAY = 200;
const HTTP1_ATTEMPTS = 6; // 3 rounds × 2 IP versions

export default function waitForLocalhost({port = 80, path = '/', useGet, statusCodes = [200], signal} = {}) {
	return new Promise((resolve, reject) => {
		let attemptCount = 0;
		const method = useGet ? 'GET' : 'HEAD';
		let retryTimeout;

		if (signal?.aborted) {
			reject(signal.reason);
			return;
		}

		const cleanup = () => {
			if (retryTimeout) {
				clearTimeout(retryTimeout);
			}
		};

		signal?.addEventListener('abort', () => {
			cleanup();
			reject(signal.reason);
		}, {once: true});

		const handleResponse = (statusCode, ipVersion, onError) => {
			if (statusCodes.includes(statusCode)) {
				resolve({ipVersion});
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
				signal,
			}, response => {
				handleResponse(response.statusCode, ipVersion, onError);
			});

			request.on('error', onError);
			request.end();
		};

		const tryHttp2 = (ipVersion, onError) => {
			const hostname = ipVersion === 6 ? '[::1]' : 'localhost';
			const client = http2.connect(`http://${hostname}:${port}`);

			const cleanupClient = () => {
				if (!client.destroyed) {
					client.destroy();
				}
			};

			// Cleanup on abort
			signal?.addEventListener('abort', cleanupClient, {once: true});

			client.on('error', () => {
				cleanupClient();
				onError();
			});

			const request = client.request({
				':method': method,
				':path': path,
			});

			request.on('response', headers => {
				cleanupClient();
				handleResponse(headers[':status'], ipVersion, onError);
			});

			request.on('error', () => {
				cleanupClient();
				onError();
			});

			request.end();
		};

		const tryRequest = (ipVersion, onError) => {
			const useHttp2 = attemptCount > HTTP1_ATTEMPTS;
			const requestFunction = useHttp2 ? tryHttp2 : tryHttp1;
			requestFunction(ipVersion, onError);
		};

		const retry = () => {
			retryTimeout = setTimeout(attempt, RETRY_DELAY);
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
