# first-run [![Build Status](https://travis-ci.org/sindresorhus/first-run.svg?branch=master)](https://travis-ci.org/sindresorhus/first-run)

> Check if it's the first time the process is run

Can be used to greet the user the first time they use your CLI app, show usage tip, initialize something, etc.


## Install

```
$ npm install first-run
```


## Usage

### Without version
Simple use case, inside package(`name` will be taken from `package.json`):

```js
// x.js
const firstRun = require('first-run');

console.log(firstRun()); // name will be inferred
```

```js
// clear.js
const firstRun = require('first-run');

firstRun.clear(); // name will be inferred
```

```sh
$ node x.js
true
$ node x.js
false
$ node clear.js
$ node x.js
true
$ node x.js
false
```

### With version

Simple use case, inside package(`name` and `version` will be taken from `package.json`):

```js
// x.js
const firstRun = require('first-run');

console.log(firstRun({detectVersion: true})); // name and version will be inferred
```

```js
// clear.js
const firstRun = require('first-run');

firstRun.clear({detectVersion: true}); // name and version will be inferred
```

```sh
$ node x.js
true
$ node x.js
false
$ node clear.js
$ node x.js
true
$ node x.js
false
# version in package.json changes
$ node x.js
true
$ node x.js
false
```


## API

### firstRun([options])

Returns true the first time function is executed on machine for specified `name` and `version` pair, false afterwards.

### firstRun.clear([options])

Clear the saved state for specified `name` and `version` pair. Next call of `firstRun` for this pair will return true.

#### options

Type: `Object`

##### name

Type: `string`<br>
Default: `name` field in your package.json

The name used to identify it.

##### version

Type: `string`<br>
Default: `undefined`.

The version used to identify it.

##### detectVersion

Type: `boolean`<br>
Default: `false`.

If set to `true` and `name` detected from `package.json`, `version` will be also detected.

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
