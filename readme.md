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

#### options

Type: `object`

##### name

Type: `string`

The name used to identify it.

Usually, you would fetch the `name` field from package.json.
