# first-run

> Check if it's the first time the process is run

Can be used to greet the user the first time they use your CLI app, show usage tip, initialize something, etc.

## Install

```sh
npm install first-run
```

## Usage

```js
// x.js
import isFirstRun from 'first-run';

console.log(isFirstRun({name: 'x'}));
```

```
$ node x.js
true
$ node x.js
false
```

## API

### isFirstRun(options)

### clearFirstRun(options)

Clear the state.

### isFirstRunForVersion(options)

Check if it's the first time the process is run for this specific version.

Each version is tracked independently from the main `isFirstRun()` function and from other versions.

### clearFirstRunForVersion(options)

Clear the state for a specific version.

#### Example

```js
import {isFirstRunForVersion, clearFirstRunForVersion} from 'first-run';

console.log(isFirstRunForVersion({name: 'my-app', version: '2.1.0'}));
//=> true

console.log(isFirstRunForVersion({name: 'my-app', version: '2.1.0'}));
//=> false

// Clear the state for version 2.1.0
clearFirstRunForVersion({name: 'my-app', version: '2.1.0'});

console.log(isFirstRunForVersion({name: 'my-app', version: '2.1.0'}));
//=> true (cleared!)

console.log(isFirstRunForVersion({name: 'my-app', version: '2.2.0'}));
//=> true (new version!)
```

This is useful for:
- Showing version-specific onboarding or upgrade messages
- Running migration code for new versions
- Tracking feature rollouts per version
- Testing version-specific initialization logic

#### options

Type: `object`

##### name

Type: `string`\
**Required**

The name used to identify it.

Usually, you would fetch the `name` field from package.json.

##### version

Type: `string`\
**(Only for `isFirstRunForVersion` and `clearFirstRunForVersion`)**

The version to track separately. Each version will be tracked independently.
