declare namespace firstRun {
	interface Options {
		/**
		The name used to identify it. Default: `name` field in your package.json
		*/
		readonly name?: string;
		/**
		The version used to identify it. Default: `undefined`
		*/
		readonly version?: undefined | string;

		/**
		If set to `true` and `name` detected from `package.json`, `version` will be also detected. Default: `false`
		*/
		readonly detectVersion?: boolean;
	}
}

declare const firstRun: {
	/**
	Returns true the first time function is executed on machine for specified `name` and `version` pair, false afterwards.

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
	Clear the saved state for specified `name` and `version` pair. Next call of `firstRun` for this pair will return true.
	*/
	clear(options?: firstRun.Options): void;
};

export = firstRun;
