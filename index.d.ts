export type Options = {
	/**
	The name used to identify it.

	Usually, you would fetch the `name` field from package.json.
	*/
	readonly name: string;
};

export type VersionOptions = {
	/**
	The name used to identify it.

	Usually, you would fetch the `name` field from package.json.
	*/
	readonly name: string;

	/**
	The version to track separately.

	When using version tracking functions, each version will be tracked independently.
	*/
	readonly version: string;
};

/**
Check if it's the first time the process is run.

@example
```
// x.js
import isFirstRun from 'first-run';

console.log(isFirstRun({name: 'my-app'}));

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

/**
Check if it's the first time the process is run for this specific version.

Each version is tracked independently. This is useful for showing version-specific onboarding, upgrade messages, or running migration code.

@example
```
import {isFirstRunForVersion} from 'first-run';

console.log(isFirstRunForVersion({name: 'my-app', version: '2.1.0'}));
//=> true (first time running version 2.1.0)

console.log(isFirstRunForVersion({name: 'my-app', version: '2.1.0'}));
//=> false

console.log(isFirstRunForVersion({name: 'my-app', version: '2.2.0'}));
//=> true (first time running version 2.2.0)
```
*/
export function isFirstRunForVersion(options: VersionOptions): boolean;

/**
Clear the state for a specific version.
*/
export function clearFirstRunForVersion(options: VersionOptions): void;
