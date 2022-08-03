export interface Options {
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
}

/**
Wait for localhost to be ready.

@example
```
import waitForLocalhost from 'wait-for-localhost';

await waitForLocalhost({port: 8080});
console.log('Server is ready');
```
*/
export default function waitForLocalhost(options?: Options): Promise<{family: 4|6}>;
