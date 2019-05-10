declare namespace firstRun {
	interface Options {
		/**
		The name used to identify it. Default: `name` field in your package.json
		*/
		readonly name?: string;
		/**
		The version used to identify it. Default: if `name` is not set, `version` field in your package.json, otherwise `undefined`.
		*/
		readonly version?: string;
	}
}

declare const firstRun: {
	/**
	Check if it's the first time the process is run.

	@example
	```
	// x.js
	import firstRun = require('first-run');

	console.log(firstRun());

	// $ node x.js
	// true
	// $ node x.js
	// false
	```
	*/
	(options?: firstRun.Options): boolean;

	/**
	Clear the state.
	*/
	clear(options?: firstRun.Options): void;
};

export = firstRun;
