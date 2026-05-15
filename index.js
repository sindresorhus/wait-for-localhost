import http from 'node:http';
import http2 from 'node:http2';

const RETRY_DELAY = 200;

const tryHttp1 = ({
	ipVersion,
	onError,
	method,
	port,
	path,
	signal,
	handleResponse,
}) => {
	const request = http.request(
		{
			method,
			port,
			path,
			family: ipVersion,
			signal,
		},
		response => {
			handleResponse(response.statusCode, ipVersion, onError);
		},
	);

	request.on('error', onError);
	request.end();
};

const noop = () => {};

const tryHttp2 = ({
	ipVersion,
	onError,
	method,
	port,
	path,
	signal,
	handleResponse,
}) => {
	const hostname = ipVersion === 6 ? '[::1]' : 'localhost';
	const client = http2.connect(`http://${hostname}:${port}`);

	const cleanup = () => {
		signal?.removeEventListener('abort', cleanup);
		client.off('error', handleClientError);
		request.off('response', handleRequestResponse);
		request.off('error', handleRequestError);

		// Add noop error handlers to prevent unhandled error events during cleanup
		client.on('error', noop);
		request.on('error', noop);
		if (!client.destroyed) {
			client.destroy();
		}
	};

	// Cleanup on abort
	signal?.addEventListener('abort', cleanup, {once: true});

	const handleClientError = () => {
		cleanup();
		onError();
	};

	client.on('error', handleClientError);

	const request = client.request({
		':method': method,
		':path': path,
	});

	const handleRequestResponse = headers => {
		cleanup();
		handleResponse(headers[':status'], ipVersion, onError);
	};

	request.on('response', handleRequestResponse);

	const handleRequestError = () => {
		cleanup();
		onError();
	};

	request.on('error', handleRequestError);

	request.end();
};

export default function waitForLocalhost({
	port = 80,
	path = '/',
	useGet,
	statusCodes = [200],
	signal,
} = {}) {
	return new Promise((resolve, reject) => {
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

		signal?.addEventListener(
			'abort',
			() => {
				cleanup();
				reject(signal.reason);
			},
			{once: true},
		);

		const handleResponse = (statusCode, ipVersion, onError) => {
			if (statusCodes.includes(statusCode)) {
				resolve({ipVersion});
			} else {
				onError();
			}
		};

		const tryRequest = (ipVersion, requestFunction, onError) => {
			requestFunction({
				ipVersion,
				onError,
				method,
				port,
				path,
				signal,
				handleResponse,
			});
		};

		const retry = () => {
			retryTimeout = setTimeout(attempt, RETRY_DELAY);
		};

		const attempt = () => {
			tryRequest(4, tryHttp1, () => {
				tryRequest(6, tryHttp1, () => {
					tryRequest(4, tryHttp2, () => {
						tryRequest(6, tryHttp2, retry);
					});
				});
			});
		};

		attempt();
	});
}
