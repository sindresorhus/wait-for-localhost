declare namespace waitForLocalhost {
	export interface Options {
		/**
		@default 80
		*/
		port?: number;

		/**
		Use a custom `path`, e.g. `/health` for a health-check endpoint

		@default '/''
		*/
		path?: string;

		/**
		Use the `GET` HTTP-method instead of `HEAD` to check if the server is running.

		@default false
		*/
		useGet?: boolean;
	}
}

declare const waitForLocalhost: {
	/**
	Wait for localhost to be ready.

	@example
	```
	import waitForLocalhost = require('wait-for-localhost');

	(async () => {
		await waitForLocalhost({port: 8080});
		console.log('Server is ready');
	})();
	```
	 */
	(options?: waitForLocalhost.Options): Promise<void>;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function waitForLocalhost(
	// 	options?: waitForLocalhost.Options
	// ): Promise<void>;
	// export = waitForLocalhost;
	default: typeof waitForLocalhost;
};

export = waitForLocalhost;
