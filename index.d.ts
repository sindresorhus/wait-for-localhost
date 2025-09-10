export type Options = {
	/**
	@default 80
	*/
	port?: number;

	/**
	Use a custom path.

	For example, `/health` for a health-check endpoint.

	@default '/'
	*/
	path?: string;

	/**
	Use the `GET` HTTP-method instead of `HEAD` to check if the server is running.

	@default false
	*/
	useGet?: boolean;

	/**
	HTTP status codes to consider as successful responses.

	@default [200]
	*/
	statusCodes?: readonly number[];

	/**
	An AbortSignal to abort the operation.

	@example
	```
	import waitForLocalhost from 'wait-for-localhost';

	// Timeout after 5 seconds
	await waitForLocalhost({
		port: 8080,
		signal: AbortSignal.timeout(5000)
	});
	```
	*/
	signal?: AbortSignal;
};

/**
Wait for localhost to be ready.

Supports both HTTP/1 and HTTP/2 servers with automatic fallback.

@example
```
import waitForLocalhost from 'wait-for-localhost';

await waitForLocalhost({port: 8080});
console.log('Server is ready');
```
*/
export default function waitForLocalhost(options?: Options): Promise<{ipVersion: 4 | 6}>;
