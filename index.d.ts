export interface Options {
	/**
	 * @default 80
	 */
	port?: number;

	/**
	 * Use the `GET` HTTP-method instead of `HEAD` to check if the server is running.
	 *
	 * @default false
	 */
	useGet?: boolean;
}

/**
 * Wait for localhost to be ready.
 */
export default function waitForLocalhost(options?: Options): Promise<void>;
