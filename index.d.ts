export interface Options {
	/**
	The name used to identify it.

	Usually, you would fetch the `name` field from package.json.
	*/
	readonly name: string;
}

/**
Check if it's the first time the process is run.

@example
```
// x.js
import isFirstRun from 'first-run';

console.log(isFirstRun());

// $ node x.js
// true
// $ node x.js
// false
```
*/
export default function isFirstRun(options: Options): boolean;

/**
Clear the state.
*/
export function clearFirstRun(options: Options): void;
